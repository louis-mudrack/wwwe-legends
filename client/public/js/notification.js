class Notification {
    constructor(settings = {}) {
        this.defaultSettings = {
            headline: "",
            body: "",
            timeout: 3000,
            addClose: true,
        };
      this.settings = { ...this.defaultSettings, ...settings };
  
      this.init();
    }
  
    init() {
        this.container = document.querySelector('div#notification-container');

        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = "notification-container";

            document.body.appendChild(this.container);
        }
        
        this.createNotification();
        
        if (this.settings.addClose) this.addNotificationCloseToggle();
        if (this.settings.timeout) {
            setTimeout(() => {
                this.removeNotification();
            }, this.settings.timeout)
        }
    }
  
    createNotification() {
        this.notification = document.createElement('div');
        const markup = `
            <span class="headline">${this.settings.headline}</span>
            <p class="body">${this.settings.body}</p>
        `

        this.notification.classList.add('notification');
        this.notification.innerHTML = markup;

        this.container.appendChild(this.notification);
    }

    removeNotification() {
        this.notification.classList.add('fade-out');
        setTimeout(() => {
            this.notification.remove();
        }, 300);
    }
  
    addNotificationCloseToggle() {
        const closeToggle = document.createElement("div");
        closeToggle.classList.add("notification-close");

        closeToggle.addEventListener("click", () => {
            this.removeNotification();
        });

        this.notification.appendChild(closeToggle);
    }
}