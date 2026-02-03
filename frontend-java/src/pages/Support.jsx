import '../css/support-page-styles.css';

export default function SupportPage() {
    return (
        <>
        <div className="support-main">
            <div className="support-container">
                <h2>Support & Feedback</h2>
                <p>We’d love to hear from you. Please send us your feedback.</p>

                <form>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        required
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        placeholder="Describe your issue or feedback..."
                        required
                    ></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
        </>
    );
}
