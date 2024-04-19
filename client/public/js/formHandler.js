class FormHandler {
    constructor(formElement) {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.sendForm(event);
        });
    }

    sendForm(event) {
        const method = event.srcElement.dataset.method ? event.srcElement.dataset.method : event.target.method;
        const body = event.srcElement.querySelector('input[type="file"]') ? new FormData(event.target) : new URLSearchParams(new FormData(event.target));
        let fetchParams = {
            method: method,
            body: body
        };

        if (method === 'GET') {
            fetchParams = {
                method: method,
            };
        };

        fetch(event.target.action, fetchParams)
            .then((response) => {
                return response.json();
            })
            .then((body) => {
                switch(body.status) {
                    case 'fail':
                        new Notification({ headline: 'Failed', body: body.message })
                      break;
                    case 'error':
                        this.handleErrors(body)
                      break;
                    case 'success':
                        this.handleSuccess(body)
                      break;
                    default:
                        new Notification({ headline: 'Error:', body: 'Something went wrong!'});
                }
            })
            .catch((error) => {
                new Notification({ headline: 'Error:', body: 'Something went wrong!' });
            });
    }

    handleErrors(body) {
        let errorMessage = '';
        if (body.error.errors) {
            for (error in body.error.errors) {
                errorMessage += `<b>${error}</b>: ${body.error.errors[error].message} <br />`;
            }
        } else {
            errorMessage = 'User prob. exist already, but idk :/.';
        }
        new Notification({ headline: 'Error', body: errorMessage });
    }

    handleSuccess(body) {
        new Notification({ headline: 'Success', body: body.message });
        if (body.redirect) window.location.href = body.redirect;
    }
}

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
    new FormHandler(form);
});
