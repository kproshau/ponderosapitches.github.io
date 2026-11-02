# The Ponderosa Pitches — Site Management Details

The site is hosted on **Netlify**, which watches this repository:

| Branch | Publishes to | Who sees it |
|---|---|---|
| `main` | **https://ponderosapitches.com** (the live site) | Everyone |
| `staging` | **https://staging--ponderosapitches.netlify.app** (the test site) | Anyone with the link, so don't post anything private there |

Any commit to either branch shows up on its site within a minute or two. **Make changes on `staging` first, check them on the test site, then merge them into `main` in one go.** See [The editing workflow](#the-editing-workflow-test-on-staging-then-go-live).

This guide covers the updates most likely to come up:

- [Before you start](#before-you-start)
- [The editing workflow](#the-editing-workflow-test-on-staging-then-go-live)
- [Adding a new member](#adding-a-new-member)
- [Moving a member to Emeritus](#moving-a-member-to-emeritus)
- [Updating upcoming performances](#updating-upcoming-performances)
- [Updating the repertoire](#updating-the-repertoire)
- [Changing the booking form link](#changing-the-booking-form-link)
- [Adding videos and images](#adding-videos-and-images)
- [Accessibility checklist](#accessibility-checklist)
- [If something breaks](#if-something-breaks)

---

## Before you start

### How the files are organized

| File / folder | What it is |
|---|---|
| `index.html` | Home page (logo, **upcoming performances** preview, newsletter sign-up) |
| `about.html` | About the group |
| `current.html` | **Current Members** |
| `emeritus.html` | **Emeritus Members** |
| `potential-members.html` | Auditions / joining info |
| `performances.html` | **Upcoming performances** (full list) and the Google Calendar embed |
| `repertoire.html` | **Repertoire**: featured videos plus the full song list |
| `contact.html` | **Booking form link**, contact info, and the photo/video grid |
| `styles/pitches.css` | All the site's styling (colors, fonts, layout) |
| `styles/nav.js` | Menu behavior. You shouldn't need to touch it |
| `styles/upcoming.js` | Optional automatic events from Google Calendar (see below) |
| `styles/signup.js` | Newsletter sign-up form behavior |
| `images/members/` | Member headshots |
| `images/media/` | Performance videos, video poster images, captions, and photos |
| `images/default-tree.jpg` | Placeholder photo for members without a headshot |

### Ground rules for editing HTML

- **Copy an existing block and change the text.** Every section below has a block you can copy. That's the safest way to keep the layout and accessibility working.
- Every opening tag needs its closing tag (`<li>` … `</li>`, `<p>` … `</p>`). Most broken layouts come from a missing or extra closing tag.
- Special characters: type `&amp;` for **&**. Apostrophes and quotes are fine as-is.
- Anything between `<!--` and `-->` is a **comment**. It's hidden from visitors. You can "turn off" a block (for example, a member on leave) by wrapping it in a comment instead of deleting it. `current.html` already does this for one card.
- File names: lowercase, no spaces, hyphens between words (`jane-doe.jpg`, not `Jane Doe.JPG`). Names are case-sensitive on the live site.

---

## The editing workflow: test on staging, then go live

You don't need any software. Everything can be done on GitHub.com in a web browser.

### 1. Make your changes on `staging`

1. Sign in to GitHub and open this repository.
2. **Switch to the `staging` branch.** Click the branch dropdown near the top left (it usually says **main**) and choose **staging**. Check that it says `staging` before you edit anything.
3. Click the file you want to change (for example `current.html`), then click the **pencil icon** (Edit this file).
4. Make your change.
5. Click **Commit changes…**, write a short note on what you changed (for example "Add Jane Doe to current members"), make sure it's committing to **`staging`**, and click **Commit changes**.
6. Repeat for any other files. Small fixes and second tries are fine. Commits to `staging` are free.

**To upload images or videos:** with `staging` selected, open the folder (for example `images/members/`), click **Add file → Upload files**, drag your files in, and commit. The GitHub website accepts files up to **25 MB** each.

**Editing several files at once:** on the repository page, press the **`.`** (period) key. That opens **github.dev**, a full editor in your browser. Check that the branch shown in the bottom-left corner is `staging`. Edit as many files as you need, then use the **Source Control** panel (the branch-shaped icon on the left) to commit them all together with one message.

### 2. Check the test site

Wait a minute or two, then open **https://staging--ponderosapitches.netlify.app** and look over your changes. Check them on a phone too. If something looks wrong, go back and fix it on `staging`. Nothing has reached the live site yet.

If the page hasn't changed, try a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac).

### 3. Go live: merge `staging` into `main`

1. On GitHub, click **Pull requests → New pull request**.
2. Set **base: `main`** and **compare: `staging`**. GitHub lists every change that will go live.
3. Click **Create pull request**, add a short title (for example "November events and new member"), and create it.
4. Netlify adds a comment on the pull request with a **Deploy Preview** link. That's one last look at exactly what the live site will become.
5. Click **Merge pull request → Confirm merge**.

Within a minute or two, the changes are live at **https://ponderosapitches.com**.

### 4. Keep `staging` in sync

If anyone edits `main` directly, `staging` falls behind. Before starting new work, bring it up to date: **Pull requests → New pull request**, this time with **base: `staging`** and **compare: `main`**. Create and merge it. If GitHub says there's nothing to compare, `staging` is already up to date.

### Why batch changes this way?

Netlify's free plan includes a monthly allowance of credits. **Every publish to the live site (`main`) uses some of it. Commits to `staging` and Deploy Previews are free.** In GitHub's web editor, each saved file is a separate commit, so editing `main` directly can burn through several publishes for one small update. Batching everything on `staging` and merging once means one publish per update. Netlify's **Usage** page shows how much of the month's allowance is left. On the free plan, if it runs out, the site pauses until the next month rather than charging anyone.

> **Small urgent fix?** It's OK to edit `main` directly, like a wrong time on tonight's event. Just keep it to one commit (use github.dev for multiple files), then sync `staging` afterward (step 4).

---

## Adding a new member

**File:** `current.html`. **Photo folder:** `images/members/`

### 1. Add the headshot (optional)

- Any reasonably sized JPG or PNG works. The site crops it to a square from the center, so a head-and-shoulders photo with the face near the middle works best. Around 800×800 px is plenty. Keep it under about 500 KB.
- Name it after the member's first name, like the others: `images/members/jane.jpg`.
- No photo yet? Use `images/default-tree.jpg` (the pine tree placeholder) for now.

### 2. Add the member card

Members are listed **alphabetically by first name**. Find the right spot between two existing `<li class="member-card">` … `</li>` blocks and paste one of these templates.

**Full card** (facts plus an expandable bio):

```html
            <li class="member-card">
              <img class="member-card__photo" src="images/members/jane.jpg" width="400" height="400" alt="" loading="lazy" />
              <div class="member-card__head">
                <h2 class="member-card__name">Jane Doe</h2>
                <p class="member-card__tags"><span>Soprano</span><span>she/her</span></p>
                <p class="member-card__role">Treasurer</p>
              </div>
              <dl class="member-card__facts">
                <div><dt>Favorite artist</dt><dd>Artist name</dd></div>
                <div><dt>Favorite tree</dt><dd>Ponderosa pine</dd></div>
                <div><dt>Favorite Pitches song</dt><dd><cite>Song Title</cite></dd></div>
                <div><dt>Musical fun fact</dt><dd>A fun fact.</dd></div>
                <div><dt>Why I love the Pitches</dt><dd>A sentence or two.</dd></div>
              </dl>
              <details class="member-card__bio">
                <summary>Read Jane's bio</summary>
                <p>Bio paragraph goes here.</p>
              </details>
            </li>
```

**"Bio coming soon" card** (when you only have a name and voice part):

```html
            <li class="member-card">
              <img class="member-card__photo" src="images/default-tree.jpg" width="400" height="400" alt="" loading="lazy" />
              <div class="member-card__head">
                <h2 class="member-card__name">Jane Doe</h2>
                <p class="member-card__tags"><span>Soprano</span><span>she/her</span></p>
              </div>
              <p class="member-card__soon">Bio coming soon!</p>
            </li>
```

Notes:

- **Voice part / pronouns:** each `<span>` inside `member-card__tags` becomes a small tag. Leave out pronouns if the member prefers not to list them.
- **Role** (`member-card__role`): delete that whole line if the member has no officer or director role. Separate multiple roles with ` · ` (as on Lindsay's and Sarah's cards).
- **Facts:** delete any `<div><dt>…</dt><dd>…</dd></div>` line the member didn't answer. Song titles go inside `<cite>…</cite>`.
- **Bio:** delete the whole `<details>` … `</details>` block if there's no bio. Change "Read Jane's bio" to their name. For more than one paragraph, add more `<p>…</p>` lines inside `<details>`.
- **Leave `alt=""` empty on headshots.** The member's name appears right next to the photo, so screen readers would just hear the name twice. This is intentional.

### 3. If the group photo changes

The group photo appears on the home page and in link previews. Its description reads "The nine members of the Ponderosa Pitches…" in the `og:image:alt` line near the top of **every** page. If you replace the group photo or the headcount changes, update that line on each page (use find-and-replace).

---

## Moving a member to Emeritus

**Files:** `current.html` → `emeritus.html`

Emeritus cards are simpler: photo, name, voice part, an optional role/dates line, and a short bio paragraph. There are no "facts" and no expandable bio.

1. In `current.html`, find the member's `<li class="member-card">` block and **cut** it (or wrap it in `<!--` and `-->` if they might come back).
2. In `emeritus.html`, paste this template in alphabetical order by first name, inside `<ul class="member-cards" role="list">`:

```html
            <li class="member-card">
              <img class="member-card__photo" src="images/members/jane.jpg" width="400" height="400" alt="" loading="lazy" />
              <div class="member-card__head">
                <h2 class="member-card__name">Jane Doe</h2>
                <p class="member-card__tags"><span>Soprano</span><span>she/her</span></p>
                <p class="member-card__role">Treasurer, 2025–2026</p>
              </div>
              <p class="member-card__bio">Short bio. Copy it from their old card, or write a new one, maybe mentioning where they're headed next.</p>
            </li>
```

3. Copy over their photo path, name, and tags from the old card. Copy the bio text from inside their old `<details>` block. Bring over only the `<p>…</p>` paragraph, **not** the `<details>` or `<summary>` tags.
4. Use the role line for past roles and dates, or delete it.
5. Keep `member-card__bio` as a **single** `<p>`. Don't put another `<p>` inside it (that's invalid HTML and can break spacing).

The headshot stays in `images/members/`. There's no need to move or rename it.

---

## Updating upcoming performances

Upcoming performances appear in **two places**, and both are edited by hand:

| Page | What it shows |
|---|---|
| `index.html` (home) | The next **3** performances |
| `performances.html` | All upcoming performances, plus the full Google Calendar |

> **Also update the Google Calendar.** The calendar embed and the "Add to your calendar" buttons on `performances.html` read directly from the group's public Google Calendar. Add events there as usual and they'll show up automatically. The hand-written list on the two pages does **not** update itself (unless you turn on the automatic option below).

### Add an event

Copy this block into the `<ul class="event-list" role="list">` list on **both** pages, in date order (soonest first):

```html
              <li class="event">
                <div class="event__badge" aria-hidden="true">
                  <span class="event__month">Dec</span>
                  <span class="event__day">12</span>
                </div>
                <div class="event__body">
                  <h3 class="event__title">Holiday Concert</h3>
                  <p class="event__meta"><time datetime="2026-12-12T19:00-08:00">Saturday, December 12, 2026 at 7:00 PM</time></p>
                  <p class="event__meta"><span class="visually-hidden">Location: </span>Venue Name, Bend</p>
                  <p class="event__meta"><em>Optional one-line description.</em></p>
                  <a class="event__link" href="https://example.com/event-page">Event details</a>
                </div>
              </li>
```

How to fill it in:

- **Badge** (`event__month` / `event__day`): three-letter month and day number. This is the visual calendar tile and is hidden from screen readers, because the full date is in the line below.
- **`datetime="…"`**: the machine-readable date, used by search engines and assistive technology. Format: `YYYY-MM-DDTHH:MM-08:00`, in 24-hour time.
  - Use `-08:00` for Pacific Standard Time (early November to mid-March) and `-07:00` for Pacific Daylight Time (mid-March to early November).
  - Examples: 7:00 PM on Dec 12, 2026 → `2026-12-12T19:00-08:00`. 11:00 AM on June 6, 2027 → `2027-06-06T11:00-07:00`.
  - For an all-day event or unknown time, just the date works: `datetime="2026-12-12"`.
- **Visible date text**: written out in full, like "Saturday, December 12, 2026 at 7:00 PM".
- **Location, description, link**: delete any of these lines you don't need. Link text should say where it goes ("Ticket info", "Parade info", "Please RSVP"), not "click here".

### Remove past events

Delete the whole `<li class="event">` … `</li>` block from both pages after the event happens. On the home page, keep only the next three events. Move the next one up from `performances.html` as events pass.

### When there are no upcoming events

Delete all the `<li class="event">` blocks, leaving an empty `<ul class="event-list" role="list"></ul>`. The message "New performances are posted here as soon as they're scheduled…" appears below the list either way.

### Optional: fill the list automatically from Google Calendar

`styles/upcoming.js` can replace the hand-written lists with live events from the public Google Calendar. The calendar ID is already filled in on both pages. The only missing piece is a Google API key (`data-api-key=""` is currently empty, so the script does nothing).

The full one-time setup steps are in the comment at the top of `styles/upcoming.js`. In short: create a free Google Cloud project, enable the Google Calendar API, create an API key **restricted to the site's domain and the Calendar API**, and paste the key into `data-api-key="…"` on the `<section id="upcoming">` line in **both** `index.html` and `performances.html`.

Once that's set up:

- Events come from the calendar. The event **title**, **date/time**, and **location** are shown, and the first web link found in the event **description** becomes a "More information" link.
- `data-limit="3"` (home) and `data-limit="20"` (performances) control how many appear.
- The hand-written list stays in the HTML as a backup that shows only if the calendar can't be reached. You can leave it as-is or clear it out occasionally.

---

## Updating the repertoire

**File:** `repertoire.html`

The page has two sections: **Featured selections** (song cards with a video) and **Full repertoire** (a text list of songs).

### Add a song to the full list

Find `<ul class="rep-list" role="list">` and add a block in **alphabetical order by title** (ignore "The" when alphabetizing, as with "The Parting Glass"):

```html
                <li>
                  <cite class="rep-list__title">Song Title</cite>
                  <span class="rep-list__credit">Composer or Original Artist<span class="rep-list__arr">Arr. Arranger Name</span></span>
                </li>
```

- The **credit** is the composer, songwriter, or original artist.
- The **arrangement** line (`rep-list__arr`) is optional. If there's no arranger listed, remove the inner `<span class="rep-list__arr">…</span>` entirely, as on "Rumor Has It":

```html
                <li>
                  <cite class="rep-list__title">Rumor Has It</cite>
                  <span class="rep-list__credit">Adele</span>
                </li>
```

### Retire a song

Delete its `<li>` … `</li>` block from the list, or comment it out to keep it handy. If it's also a featured selection, remove that card too (see below). Also check `current.html`, where members list a "Favorite Pitches song". It's fine to leave those as-is.

### Add, swap, or remove a featured selection

Each featured song is one `<li class="feature">` block inside `<ul class="features" role="list">`. The cards display **two per row** on wider screens, so **keep an even number** of features (2, 4, 6…) so the grid doesn't end with a lonely card.

See [Adding videos and images](#adding-videos-and-images) below for preparing the video files first. Then copy this template:

```html
                <li class="feature">
                  <div class="feature__media">
                    <video controls preload="none" playsinline
                           poster="images/media/song-name.png" width="600" height="600"
                           aria-label="Video: The Ponderosa Pitches performing Song Title">
                      <source src="images/media/song-name.mp4" type="video/mp4" />
                          <track kind="captions" src="images/media/song-name.en.vtt" srclang="en" label="English" default />
                    </video>
                  </div>
                  <div class="feature__body">
                    <h3 class="feature__title">Song Title</h3>
                    <p class="feature__credit">Original Artist</p>
                    <p>One or two sentences: what it is, and where/when it was recorded.</p>
                  </div>
                </li>
```

- Change **all four** file references (`poster`, `source`, `track`) and the **`aria-label`** to match the new song.
- In the `aria-label`, say "performing" for a live show or "rehearsing" for a rehearsal recording.
- If you also add the song to the full list, make sure the title and credits match.

---

## Changing the booking form link

**File:** `contact.html`. This is the only place the booking form is linked. Other pages link to the Contact page, not the form directly.

1. Get the new form's link. In Google Forms, click **Send**, then the link (🔗) tab, and copy the URL. It ends in `/viewform`. Either the long link or the shortened `forms.gle/…` link works.
2. In `contact.html`, find the comment `<!-- Booking inquiry Google Form. If the form is ever replaced, update this link. -->`. Just below it, replace **only** the web address inside `href="…"`:

```html
<a class="button" href="https://docs.google.com/forms/d/e/NEW-FORM-ID/viewform" target="_blank" rel="noopener">Send a booking inquiry<span class="visually-hidden"> (opens a Google Form in a new tab)</span></a>
```

3. Keep `target="_blank" rel="noopener"` **and** the hidden "(opens a Google Form in a new tab)" text together. Screen-reader users are warned when a link opens a new tab. If you switch to something other than a Google Form (for example a booking page on another site), update that hidden text to match, such as "(opens in a new tab)".
4. After committing, open the live Contact page and click the button to confirm it opens the right form, ideally in a private/incognito window to confirm the form is open to the public.

The booking box currently has a short intro paragraph only. If a new form asks specific questions (event date, setting, audience size, etc.), consider adding a short checklist of them above the button so people know what to have ready. Use `<ul class="check-list">` with one `<li>` per item. The site already has styling for it, which shows check marks.

---

## Adding videos and images

All media lives in **`images/media/`**. Use a short, lowercase, hyphenated name and reuse it for every file belonging to the same video, for example:

```
images/media/holiday-medley.mp4      ← the video
images/media/holiday-medley.png      ← the poster (still image shown before play)
images/media/holiday-medley.en.vtt   ← the captions
```

### Preparing a video

- **Format:** MP4 (H.264 video, AAC audio). Phone videos are usually already MP4. iPhone `.mov` files should be converted.
- **Shape:** videos are shown as **squares** on both the Repertoire and Contact pages. Crop or frame them square (1:1), about 600×600 to 1080×1080 px.
- **Size:** keep each video **under about 10 MB** (current videos are 2–4 MB). Long or large files load slowly on phones and won't upload through the GitHub website (25 MB limit). The free app [HandBrake](https://handbrake.fr/) can shrink and crop video: choose a "Fast 720p" or "Fast 1080p" preset, then set the dimensions to square.
- **Length:** one song per clip. Trim silence at the start and end.

### Poster image

The still shown before someone presses play. Use a square PNG or JPG, 600×600 px, matching the video's file name. You can grab a frame from the video (pause it and take a screenshot, then crop it square).

### Captions 

**Every video with singing or speech needs captions.** This is a WCAG 2.1 AA requirement, and it lets people follow along with the sound off. Captions are a plain text `.vtt` file. The easiest way to make one:

1. Upload the clip (unlisted) to YouTube, let it auto-generate captions, correct the lyrics in YouTube Studio, and download them as `.vtt`. Or use any captioning tool that exports WebVTT.
2. Or write one by hand. It's just timestamps and text:

```
WEBVTT

00:00:00.000 --> 00:00:04.500
♪ First line of the lyrics ♪

00:00:04.500 --> 00:00:09.000
♪ Second line of the lyrics ♪
```

Use the existing files (like `images/media/landslide.en.vtt`) as a model. They also include a small style block at the top that sets the caption font. Copy it into new files if you want new captions to match.

Then make sure the `<track kind="captions" … />` line in the HTML points to the file and **isn't commented out**.

**Captions already burned into the video?** Some videos have captions embedded in the picture itself ("open captions"). This was a mistake (oops), but technically those already meet the requirement, so **don't** add a `.vtt` track as well, or the captions will show twice, overlapping. Leave the `<track>` line out, or keep it commented out with a note:

```html
<!-- Captions are burned into the video; no track needed -->
<!-- <track kind="captions" src="images/media/song-name.en.vtt" srclang="en" label="English" default /> -->
```

> **Muses Medley** and **Wildflowers** are this way: their captions are burned in, so their `<track>` lines on the Repertoire page are commented out on purpose. Don't turn them back on. (Their `.vtt` files are kept in `images/media/` in case the videos are ever re-exported without captions.)

### Adding a video to the Repertoire page

See [Add, swap, or remove a featured selection](#add-swap-or-remove-a-featured-selection).

### Adding a photo or video to the Contact page grid

**File:** `contact.html`, inside `<ul class="social-grid" role="list">`, under the "Follow along" heading. The grid tiles are square, so use square images (about **400×400** px PNG or JPG, under about 400 KB each).

**Photo tile** (links to Instagram, with a caption that appears on hover/focus):

```html
              <li>
                <a href="https://instagram.com/ponderosapitches">
                  <img src="images/media/photo-name.png" loading="lazy" alt="Describe what's in the photo: who, doing what, where." />
                  <span class="social-grid__caption">Short, friendly caption shown on hover</span>
                  <span class="visually-hidden"> (view on Instagram)</span>
                </a>
              </li>
```

- **Alt text is required** for these photos. Describe what's in the picture (for example "Members of the Pitches singing on stage at the Tower Theatre"). Don't start with "Image of…".
- If the photo has its own Instagram post, you can paste that post's URL into `href="…"` instead of the profile link.

**Video tile:**

```html
              <li class="social-grid__video">
                <figure>
                  <video controls preload="none" playsinline
                         poster="images/media/song-name.png" width="600" height="600"
                         aria-label="Video: The Ponderosa Pitches performing Song Title">
                    <source src="images/media/song-name.mp4" type="video/mp4" />
                    <track kind="captions" src="images/media/song-name.en.vtt" srclang="en" label="English" default />
                  </video>
                  <figcaption>The Pitches performing "Song Title", Month Year.</figcaption>
                </figure>
              </li>
```

The `<figcaption>` line is optional. Delete it or comment it out for a cleaner grid, as with the current videos. If you leave it out, keep the `aria-label` so screen-reader users know what the video is.

**Grid size:** the grid looks best with a multiple of **3** tiles (3, 6, 9…). There are currently 6. When adding new tiles, consider removing the oldest ones to keep the page light.

### Removing media

Delete the HTML block first, then delete the file(s) from `images/media/` (open the file on GitHub → **⋯** menu → **Delete file**). Don't delete a file that's still used somewhere. Videos like `landslide.mp4` and `parting-glass.mp4` are used on **both** the Repertoire and Contact pages. To check, use GitHub's search bar (press `/`) to search the repository for the file name.

---

## Accessibility checklist

The site is built to meet WCAG 2.1 AA. Before committing a change, check:

- [ ] **Photos with content** (Contact grid) have meaningful `alt` text. **Headshots** keep `alt=""`, since the name is next to them.
- [ ] **Videos** have captions, either a `<track>` that isn't commented out or captions burned into the video (never both), plus an `aria-label`.
- [ ] **Links** say where they go ("Ticket info", not "Click here"). Links that open a new tab include the hidden "(opens in a new tab)" text.
- [ ] **Headings stay in order.** Use the same heading tags (`h2`, `h3`) as the blocks you copied. Don't change them for size or style.
- [ ] **Event dates** have both the readable text and the matching `datetime="…"` value.
- [ ] **Check on a phone.** Open the live page on your phone after committing and make sure nothing looks broken.

For a quick automated check, run the free [WAVE checker](https://wave.webaim.org/) on the live page URL.

---

## If something breaks

- **The live site is broken and you need it back right now:** in Netlify, open the project's **Deploys** tab, click the last deploy that worked, and choose **Publish deploy**. The live site goes straight back to that version, and rolling back doesn't use any credits. Then fix the problem on `staging` and merge as usual. The next merge to `main` publishes normally again.
- **Every change is saved in history and can be undone.** On GitHub, open the file and click **History** to see past versions. Open the version before the bad change, copy its contents, and paste them back into the editor. Or, if you're comfortable with Git, use `git revert <commit>`.
- **The layout is suddenly broken below a certain point:** almost always a missing or extra closing tag (`</li>`, `</div>`, `</p>`) in the last block you edited. Compare it line by line with a block you didn't touch.
- **An image or video doesn't appear:** check that the file name in the HTML exactly matches the uploaded file, including capitalization and extension (`.jpg` vs `.jpeg` vs `.png`).
- **The change isn't showing up:** wait a couple of minutes, then hard-refresh. Check that you committed to the branch you meant to (`staging` vs `main`). In Netlify, the project's **Deploys** tab lists each deploy with its branch and status. A **Failed** deploy shows a log explaining why, and the site keeps showing the last good version in the meantime.
- **Captions don't show:** the `.vtt` file must start with the line `WEBVTT`, and each timestamp line must use the format `00:00:00.000 --> 00:00:04.000`.

### Accounts and services the site depends on

| Service | Used for | Where it's referenced |
|---|---|---|
| GitHub (this repo) | Stores the site's files and their history | — |
| Netlify (project `ponderosapitches`) | Hosting, HTTPS certificate, live and staging sites | Watches the `main` and `staging` branches of this repo |
| Porkbun | The `ponderosapitches.com` domain and email forwarding for `hello@` | DNS records at Porkbun (see below) |
| Google Calendar | Performance calendar embed and subscribe buttons | `performances.html` (and `index.html` if automatic events are on) |
| Google Forms | Booking inquiry form | `contact.html` |
| MailerLite | Newsletter sign-up | `index.html` (the `<form class="signup">` action URL) |
| Partiful and event sites | Per-event RSVP / info links | Event blocks on `index.html` and `performances.html` |

Make sure at least two group members can sign in to each of these.

### Domain settings at Porkbun (for reference)

These DNS records connect the domain to Netlify and keep email working. **You shouldn't need to change them.** If the site or email ever stops working at the domain, check that these are still in place:

| Type | Host | Value | Purpose |
|---|---|---|---|
| ALIAS | *(blank)* | `apex-loadbalancer.netlify.com` | Sends `ponderosapitches.com` to Netlify |
| CNAME | `www` | `ponderosapitches.netlify.app` | Sends `www.ponderosapitches.com` to Netlify, which redirects it to the main address |
| MX | *(blank)* | `fwd1.porkbun.com` / `fwd2.porkbun.com` | Email forwarding for `hello@ponderosapitches.com`. **Don't delete.** |
| TXT | *(blank)* | `v=spf1 include:_spf.porkbun.com ~all` | Helps forwarded email avoid spam folders. **Don't delete.** |

Don't change the domain's **nameservers** at Porkbun. That would move all of these records elsewhere and break the site and email. Also leave Porkbun's **URL Forwarding** off for this domain, since it conflicts with the records above.
