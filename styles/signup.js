/* Newsletter sign-up without leaving the page (no dependencies).
   - Sends the form to MailerLite in the background and shows a thank-you message here.
   - The browser checks required fields first, so this only runs on a valid form.
   - If the background request fails (network, or MailerLite changes how it responds),
     the visitor sees a short message and the next click submits the normal way,
     opening MailerLite's own page in a new tab, as before.
   - Without JavaScript the form works exactly as written in the HTML. */
(function () {
  'use strict';

  var form = document.querySelector('form.signup');
  if (!form || !window.fetch || !window.FormData) { return; }

  var button = form.querySelector('[type="submit"]');
  var buttonText = button ? button.textContent : '';
  var useNativeSubmit = false;

  /* One status line, read out by screen readers when it changes */
  var status = document.createElement('p');
  status.className = 'signup__status';
  status.setAttribute('role', 'status');
  status.setAttribute('tabindex', '-1');
  form.insertBefore(status, form.firstChild);

  function setBusy(busy) {
    if (!button) { return; }
    button.disabled = busy;
    button.textContent = busy ? 'Subscribing…' : buttonText;
  }

  form.addEventListener('submit', function (e) {
    if (useNativeSubmit) { return; }   /* fallback: let the browser handle it */
    e.preventDefault();
    setBusy(true);
    status.textContent = '';
    status.className = 'signup__status';

    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) { throw new Error(r.status); } return r.json(); })
      .then(function (data) {
        if (!data || data.success !== true) { throw new Error('not accepted'); }
        /* Replace the fields with a confirmation */
        Array.prototype.forEach.call(form.children, function (child) {
          if (child !== status && child.type !== 'hidden') { child.hidden = true; }
        });
        status.className = 'signup__status is-success';
        status.textContent = "Thanks for subscribing! Check your inbox for a message from us.";
        status.focus();
      })
      .catch(function () {
        useNativeSubmit = true;
        setBusy(false);
        status.className = 'signup__status is-error';
        status.textContent = "We couldn't finish signing you up here. Press Subscribe again to complete it on our newsletter page, or email hello@ponderosapitches.com.";
        status.focus();
      });
  });
})();
