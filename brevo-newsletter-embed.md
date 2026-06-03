# Brevo Newsletter Embed Code

## Anleitung zur Einbindung

1. **CSS + Font-Code** → in den `<head>` der `index.html` einfügen
2. **Formular-Code** → an der gewünschten Stelle im `<body>` einfügen
3. **Script-Code** → kurz vor `</body>` einfügen

---

## Code

```html
<!-- Begin Brevo Form -->


<!-- START - We recommend to place the below code in head tag of your website html  -->

<style>
  @font-face {
    font-display: block;
    font-family: Roboto;
    src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
  }

  @font-face {
    font-display: fallback;
    font-family: Roboto;
    font-weight: 600;
    src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
  }

  @font-face {
    font-display: fallback;
    font-family: Roboto;
    font-weight: 700;
    src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
  }

  :where(.sib-form-message-panel) {
    display: none;
  }

  :where(.sib-form-message-panel .sib-notification__icon) {
    width: 20px;
    height: 20px;
  }

  #sib-container input:-ms-input-placeholder {
    font-family: Helvetica, sans-serif;
    text-align: left;
    color: #c0ccda;
  }

  #sib-container input::placeholder {
    font-family: Helvetica, sans-serif;
    text-align: left;
    color: #c0ccda;
  }

  #sib-container textarea::placeholder {
    font-family: Helvetica, sans-serif;
    text-align: left;
    color: #c0ccda;
  }

  #sib-container a {
    text-decoration: underline;
    color: #2BB2FC;
  }
</style>
<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">

<!-- END - head code -->


<!-- START - Formular Code (in <body> einfügen) -->
<div class="sib-form" style="text-align: center; background-color: transparent;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
        </svg>
        <span class="sib-form-message-panel__inner-text">
          Deine Anmeldung konnte nicht gespeichert werden. Bitte versuche es erneut.
        </span>
      </div>
    </div>
    <div></div>
    <div id="success-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#085229; background-color:#e7faf0; border-color:#13ce66; border-radius:3px; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
        </svg>
        <span class="sib-form-message-panel__inner-text">
          Deine Anmeldung war erfolgreich.
        </span>
      </div>
    </div>
    <div></div>
    <div id="sib-container" class="sib-container--large sib-container--vertical" style="max-width:540px; text-align:center; background-color:rgba(255,255,255,1); border-width:1px; border-style:solid; border-color:#C0CCD9; border-radius:3px; direction:ltr">
      <form id="sib-form" method="POST" action="https://421e8861.sibforms.com/serve/MUIFAI7Ta4MS6vOVEa615Sb_hI1kD63WUC0pa_cAE3muYuuMu-XvCQNhZx2PWwhl2a5Z34OlXvsrQZlpGqPxgQK9jP8xbrf9qhkYoZ33Z363y8HeEqdnBjCSdELhJyJqJSTf0qeX7oTwf2GYkaShPTUIY1E6bNx7nkh2VjdYunDKKRAIiPCoejdjlxfUrBZZDbFVdqgEiHWB3sv8" data-type="subscription">

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <label class="entry__label" style="font-weight: 700; text-align: left; font-family:Helvetica, sans-serif; font-size:16px; color:#3c4858;" for="EMAIL" data-required="*">E-Mail:</label>
                <div class="entry__field">
                  <input class="input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" value="" placeholder="EMAIL" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
              <label class="entry__specification" style="font-family:Helvetica, sans-serif; font-size:12px; text-align:left; color:#8390A4;">
                Please enter your e-mail address for registration, e.g. abc@xyz.com.
              </label>
            </div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-optin sib-form-block">
            <div class="form__entry entry_mcq">
              <div class="form__label-row">
                <div class="entry__choice">
                  <label>
                    <input type="checkbox" class="input_replaced" value="1" id="OPT_IN" name="OPT_IN" />
                    <span class="checkbox checkbox_tick_positive"></span>
                    <span style="font-family:Helvetica, sans-serif; font-size:14px; text-align:left; color:#3C4858;">
                      <p>Ja, ich möchte den SHOWTECH-Newsletter mit weiteren Informationen zur Veranstaltung erhalten</p>
                    </span>
                  </label>
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
              <label class="entry__specification" style="font-family:Helvetica, sans-serif; font-size:12px; text-align:left; color:#8390A4;">
                You can unsubscribe from the newsletter at any time via the link in our newsletter.
              </label>
            </div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align: left">
            <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-family:Helvetica, sans-serif; font-size:16px; font-weight:700; text-align:left; color:#FFFFFF; background-color:#e53935; border-width:0px; border-radius:20px;" form="sib-form" type="submit">
              Anmelden
            </button>
          </div>
        </div>

        <input type="text" name="email_address_check" value="" class="input--hidden">
        <input type="hidden" name="locale" value="de">

      </form>
    </div>
  </div>
</div>
<!-- END - Formular Code -->


<!-- START - Script Code (vor </body> einfügen) -->
<script>
  window.REQUIRED_CODE_ERROR_MESSAGE = 'Wähle bitte einen Ländervorwahl aus.';
  window.LOCALE = 'de';
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
  window.REQUIRED_ERROR_MESSAGE = "Dieses Feld darf nicht leer sein.";
  window.GENERIC_INVALID_MESSAGE = "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
  window.INVALID_NUMBER = "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
  window.INVALID_DATE = "Bitte gib ein gültiges Datum ein";
  window.REQUIRED_MULTISELECT_MESSAGE = 'Wähle bitte mindestens eine Option aus';
  window.translation = {
    common: {
      selectedList: '{quantity} Liste ausgewählt',
      selectedLists: '{quantity} Listen ausgewählt',
      selectedOption: '{quantity} ausgewählt',
      selectedOptions: '{quantity} ausgewählt',
    }
  };
  var AUTOHIDE = Boolean(0);
</script>
<script defer src="https://sibforms.com/forms/end-form/build/main.js"></script>
<!-- END - Script Code -->

<!-- End Brevo Form -->
```
