$(document).ready(function () {
    let urlBtn = `<a href="#" class="w-100 btn btn-success btn-lg wa-url" target="_blank">Go to WhatsApp</a>`;

    let isPhoneNumberValid = false;
    let isMessageValid = false;

    function setValidationState(selector, invalid, feedback) {
        if (invalid) {
            $(selector).addClass("is-invalid");
            $(selector + " + .invalid-feedback").text(feedback);
        } else {
            $(selector).removeClass("is-invalid");
            $(selector + " + .invalid-feedback").text("");
        }
    }

    function validatePhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\s+|\(|\)/g, '');

        if (!phoneNumber) {
            setValidationState("#phoneNumber", true, "* Phone number is required");
            isPhoneNumberValid = false;
        } else if (!/^\+?\d{10,}$/.test(phoneNumber)) {
            setValidationState("#phoneNumber", true, "* Invalid phone number format");
            isPhoneNumberValid = false;
        } else {
            setValidationState("#phoneNumber", false, "");
            isPhoneNumberValid = true;
        }
    }

    function validateMessage(message) {
        if (message.length > 1000) {
            setValidationState("#message", true, "* Message cannot be longer than 1000 characters");
            isMessageValid = false;
        } else {
            setValidationState("#message", false, "");
            isMessageValid = true;
        }
    }

    function generateWhatsAppURL(phoneNumber, message) {
        validatePhoneNumber(phoneNumber);
        validateMessage(message);

        if (isPhoneNumberValid && isMessageValid) {
            $('.btnDiv').html(urlBtn);
            let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
            $(".wa-url").attr("href", url);
        } else {
            $('.wa-url').remove();
        }
    }

    function updateUrl() {
        let phoneNumber = $("#phoneNumber").val();
        let message = $("#message").val();
        generateWhatsAppURL(phoneNumber, message);
    }

    $("#phoneNumber, #message").on('input', updateUrl);
});