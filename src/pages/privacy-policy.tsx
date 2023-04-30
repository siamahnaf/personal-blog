//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

const PrivacyPolicy = () => {
    return (
        <Layout>
            <SiteSeo title="Privacy Policy" />
            <Container className="pt-40 smd:pt-40 xxs:pt-32 pb-16">
                <h2 className="text-center text-4xl font-bold mb-8">Privacy</h2>
                <div>
                    <p className="text-lg my-3">At Siam Ahnaf, we are committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, and protect the personal information that you provide to us through our website.</p>
                    <h2 className="text-3xl sm:text-3xl xxs:text-2xl font-bold">Responsibility of Contributors</h2>
                    <p className="text-lg my-3">All contributors to [Your Blog Site Name] are responsible for ensuring that the content they contribute does not infringe upon the privacy rights of others. We reserve the right to remove any content that we believe to be in violation of our privacy policy.</p>

                    <h2 className="text-3xl sm:text-3xl xxs:text-2xl font-bold">Gathering of Personal Information</h2>
                    <p className="text-lg my-3">We collect personal information from users in a variety of ways, including when they register for an account, submit a comment, or interact with our site in other ways. This information may include your name, email address, and any other personal information that you choose to provide.</p>

                    <h2 className="text-3xl sm:text-3xl xxs:text-2xl font-bold">Protection of Personal Information</h2>
                    <p className="text-lg my-3">We take reasonable steps to protect the personal information that we collect from our users. This includes implementing security measures such as encryption and firewalls to protect against unauthorized access to our servers. However, we cannot guarantee that your personal information will be completely secure.</p>

                    <h2 className="text-3xl sm:text-3xl xxs:text-2xl font-bold">Privacy Policy Changes</h2>
                    <p className="text-lg my-3">We reserve the right to make changes to our Privacy Policy at any time. Any changes will be posted on this page and will become effective immediately. It is your responsibility to review this Privacy Policy periodically to stay informed about any changes.</p>

                    <p className="text-lg my-3">If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].</p>

                    <p className="text-teal-500">Siam Ahnaf<br />
                        mail@siamahnaf.com</p>
                </div>
            </Container>
        </Layout>
    );
};

export default PrivacyPolicy;