class FormHandler {
    constructor(formElement) {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.toggleSpinner(event);
            this.sendForm(event);
            this.toggleSpinner(event);
        });
    }

    sendForm(event) {
        const method = event.srcElement.dataset.method ? event.srcElement.dataset.method : event.target.method;
        const body = event.srcElement.querySelector('input[type="file"]') ? new FormData(event.target) : new URLSearchParams(new FormData(event.target));
        let fetchParams = {
            method: method,
            body: body,
        };

        if (method === 'GET') {
            fetchParams = {
                method: method,
            };
        }

        fetch(event.target.action, fetchParams)
            .then((response) => {
                return response.json();
            })
            .then((body) => {
                switch (body.status) {
                    case 'fail':
                        new Notification({ headline: 'Failed', body: body.message });
                        break;
                    case 'error':
                        this.handleErrors(body);
                        break;
                    case 'warning':
                        new Notification({ headline: 'Warning', body: body.message });
                        break;
                    case 'success':
                        this.handleSuccess(body);
                        break;
                    default:
                        new Notification({ headline: 'Error:', body: 'Something went wrong!' });
                }
            })
            .catch((error) => {
                new Notification({ headline: 'Error:', body: 'Something went wrong!' });
            });
    }

    toggleSpinner(event) {
        const submitBtn = event.srcElement.querySelector('[type="submit"]');
        submitBtn.toggleAttribute('disabled');
        if (submitBtn.getAttribute('aria-busy') === 'true') {
            submitBtn.setAttribute('aria-busy', false);
        } else {
            submitBtn.setAttribute('aria-busy', true);
        }
    }

    handleErrors(body) {
        let errorMessage = '';
        if (body.error.errors) {
            for (error in body.error.errors) {
                errorMessage += `<b>${error}</b>: ${body.error.errors[error].message} <br />`;
            }
        } else {
            errorMessage = body.message ? body.message : 'Something happend and I have no idea what to do :/';
        }
        new Notification({ headline: 'Error', body: errorMessage });
    }

    handleSuccess(body) {
        new Notification({ headline: 'Success', body: body.message });
        if (body.redirect) {
            setTimeout(() => {
                window.location.href = body.redirect;
            }, 1000);
        }
    }
}

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
    new FormHandler(form);
});
