/* Optional: fill the "Upcoming Performances" list from a PUBLIC Google Calendar.

   Progressive enhancement: the hand-written HTML in default.html is the
   fallback. This script only replaces it if it successfully loads events.
   It does nothing until BOTH data-calendar-id and data-api-key are set on
   the #upcoming section.

   Setup (one time). You do NOT need edit access to the calendar, but it must
   already be public (if the embed works for logged-out visitors, it is):
     1. Calendar ID: it is the value of "src=" in the embed code's URL
        (https://calendar.google.com/calendar/embed?src=THIS_PART&...).
        Newer embed codes may show it Base64-encoded; if the value ends in
        "=" or has no "@", decode it first (e.g. atob("...") in a browser
        console). It usually looks like xxxx@group.calendar.google.com.
     2. API key: in Google Cloud Console create a project, enable "Google
        Calendar API", create an API key, and restrict it to your site's
        domain (HTTP referrers) and to the Calendar API. A restricted key is
        safe to publish in page source. Any Google account can do this.
     3. Put both values in the data- attributes on <section id="upcoming">.
   If you'd rather not do this, just maintain the list in default.html by hand.

   Event text is inserted with textContent only (never innerHTML), so
   calendar content cannot inject markup.

   When events load, the script also adds schema.org "MusicEvent" data so
   search engines can list the performances (with date and venue) in results. */
(function () {
  'use strict';

  var section = document.getElementById('upcoming');
  if (!section) { return; }

  var calendarId = section.getAttribute('data-calendar-id');
  var apiKey = section.getAttribute('data-api-key');
  var limit = parseInt(section.getAttribute('data-limit'), 10) || 3;
  var tz = section.getAttribute('data-timezone') || 'America/Los_Angeles';
  var list = section.querySelector('.event-list');
  var empty = section.querySelector('.event-empty');
  if (!calendarId || !apiKey || !list) { return; }

  var url = 'https://www.googleapis.com/calendar/v3/calendars/' +
    encodeURIComponent(calendarId) + '/events' +
    '?key=' + encodeURIComponent(apiKey) +
    '&singleEvents=true&orderBy=startTime' +
    '&timeMin=' + encodeURIComponent(new Date().toISOString()) +
    '&maxResults=' + limit;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text) { node.textContent = text; }
    return node;
  }

  function fmt(date, opts) {
    return new Intl.DateTimeFormat('en-US', Object.assign({ timeZone: tz }, opts)).format(date);
  }

  /* First http(s) link in the event description (descriptions may be HTML). */
  function firstLink(description) {
    if (!description) { return null; }
    var doc = new DOMParser().parseFromString(description, 'text/html');
    var a = doc.querySelector('a[href^="http"]');
    if (a) { return a.getAttribute('href'); }
    var m = (doc.body.textContent || '').match(/https?:\/\/[^\s<>"']+/);
    return m ? m[0] : null;
  }

  function render(ev) {
    var allDay = !!(ev.start && ev.start.date);
    var start = new Date(allDay ? ev.start.date + 'T12:00:00' : ev.start.dateTime);
    var when = allDay
      ? new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(ev.start.date + 'T12:00:00Z'))
      : fmt(start, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) +
        ' at ' + fmt(start, { hour: 'numeric', minute: '2-digit' });

    var li = el('li', 'event');

    var badge = el('div', 'event__badge');
    badge.setAttribute('aria-hidden', 'true');   /* full date is in the <time> text */
    badge.appendChild(el('span', 'event__month',
      allDay ? new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short' }).format(new Date(ev.start.date + 'T12:00:00Z'))
             : fmt(start, { month: 'short' })));
    badge.appendChild(el('span', 'event__day',
      allDay ? String(parseInt(ev.start.date.slice(8, 10), 10))
             : fmt(start, { day: 'numeric' })));
    li.appendChild(badge);

    var body = el('div', 'event__body');
    body.appendChild(el('h3', 'event__title', ev.summary || 'Performance'));

    var p = el('p', 'event__meta');
    var time = document.createElement('time');
    time.setAttribute('datetime', allDay ? ev.start.date : ev.start.dateTime);
    time.textContent = when;
    p.appendChild(time);
    body.appendChild(p);

    if (ev.location) {
      var loc = el('p', 'event__meta');
      loc.appendChild(el('span', 'visually-hidden', 'Location: '));
      var map = document.createElement('a');
      map.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ev.location);
      map.textContent = ev.location;
      loc.appendChild(map);
      body.appendChild(loc);
    }

    var more = firstLink(ev.description);
    if (more) {
      var a = el('a', 'event__link', 'More information');
      a.href = more;
      a.appendChild(el('span', 'visually-hidden', ' about ' + (ev.summary || 'this performance')));
      body.appendChild(a);
    }

    li.appendChild(body);
    return li;
  }

  /* Machine-readable copy of the events for search engines */
  function addStructuredData(items) {
    var data = items.map(function (ev) {
      var e = {
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        name: ev.summary || 'The Ponderosa Pitches in concert',
        startDate: ev.start.dateTime || ev.start.date,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        performer: { '@type': 'MusicGroup', name: 'The Ponderosa Pitches' },
        organizer: { '@type': 'Organization', name: 'The Ponderosa Pitches', url: location.origin + '/' }
      };
      if (ev.end) { e.endDate = ev.end.dateTime || ev.end.date; }
      if (ev.location) { e.location = { '@type': 'Place', name: ev.location.split(',')[0], address: ev.location }; }
      var more = firstLink(ev.description);
      if (more) { e.url = more; }
      return e;
    });
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  section.setAttribute('aria-busy', 'true');

  fetch(url)
    .then(function (r) { if (!r.ok) { throw new Error('Calendar request failed: ' + r.status); } return r.json(); })
    .then(function (data) {
      var items = (data.items || []).filter(function (e) { return e.status !== 'cancelled'; });
      list.textContent = '';
      if (!items.length) {
        list.hidden = true;
        if (empty) { empty.hidden = false; }
        return;
      }
      items.forEach(function (ev) { list.appendChild(render(ev)); });
      list.hidden = false;
      if (empty) { empty.hidden = true; }
      addStructuredData(items);
    })
    .catch(function (err) {
      /* Leave the static fallback content untouched. */
      if (window.console) { console.warn('[upcoming.js]', err.message); }
    })
    .then(function () { section.removeAttribute('aria-busy'); });
})();
