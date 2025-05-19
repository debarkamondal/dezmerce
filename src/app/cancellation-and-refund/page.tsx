import React from "react";
import Head from "next/head"; // Import Head if you're using Next.js

const CancellationAndRefund = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Add SEO metadata for better crawlability */}
      <Head>
        <title>Cancellation and Refund Policy</title>
        <meta
          name="description"
          content="Our official cancellation, return and refund policy at Debarka Modal"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.dkmondal.in/cancellation-and-refund"
        />
      </Head>

      <main className="prose prose-lg max-w-none">
        <h1 id="cancellation-refund-policy" className="mb-4 text-3xl font-bold">
          Cancellation and Refund Policy
        </h1>
        <p className="mb-6 text-sm text-gray-600">Last updated: May 19, 2025</p>

        <div className="mb-6">
          <p>Thank you for shopping at Debarka Modal.</p>
          <p>
            If, for any reason, You are not completely satisfied with a purchase
            We invite You to review our policy on refunds and returns.
          </p>
          <p>
            The following terms are applicable for any products that You
            purchased with Us.
          </p>
        </div>

        <section id="interpretation-definitions" className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">
            Interpretation and Definitions
          </h2>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-medium">Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-medium">Definitions</h3>
            <p>For the purposes of this Return and Refund Policy:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Company</strong> (referred to as either &apos;the
                Company&apos; &apos;We&apos; &apos;Us&apos; or &apos;Our&apos;
                in this Agreement) refers to Debarka Modal.
              </li>
              <li>
                <strong>Goods</strong> refer to the items offered for sale on
                the Service.
              </li>
              <li>
                <strong>Orders</strong> mean a request by You to purchase Goods
                from Us.
              </li>
              <li>
                <strong>Service</strong> refers to the Website.
              </li>
              <li>
                <strong>Website</strong> refers to Debarka Modal, accessible
                from{" "}
                <a
                  href="https://www.dkmondal.in"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.dkmondal.in
                </a>
              </li>
              <li>
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </li>
            </ul>
          </div>
        </section>

        <section id="cancellation-rights" className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">
            Your Order Cancellation Rights
          </h2>
          <p>
            You are entitled to cancel Your Order within{" "}
            <strong>30 days</strong> without giving any reason for doing so.
          </p>
          <p>
            The deadline for cancelling an Order is 30 days from the date on
            which You received the Goods or on which a third party you have
            appointed, who is not the carrier, takes possession of the product
            delivered.
          </p>
          <p>
            In order to exercise Your right of cancellation, You must inform Us
            of your decision by means of a clear statement. You can inform us of
            your decision by:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>
              By email:{" "}
              <a
                href="mailto:debarkamondal@gmail.com"
                className="text-blue-600 hover:underline"
              >
                debarkamondal@gmail.com
              </a>
            </li>
          </ul>
          <p>
            We will reimburse You no later than 14 days from the day on which We
            receive the returned Goods. We will use the same means of payment as
            You used for the Order, and You will not incur any fees for such
            reimbursement.
          </p>
        </section>

        <section id="return-conditions" className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">
            Conditions for Returns
          </h2>
          <p>
            In order for the Goods to be eligible for a return, please make sure
            that:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>The Goods were purchased in the last 30 days</li>
            <li>The Goods are in the original packaging</li>
          </ul>
          <p>The following Goods cannot be returned:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>
              The supply of Goods made to Your specifications or clearly
              personalized.
            </li>
            <li>
              The supply of Goods which according to their nature are not
              suitable to be returned, deteriorate rapidly or where the date of
              expiry is over.
            </li>
            <li>
              The supply of Goods which are not suitable for return due to
              health protection or hygiene reasons and were unsealed after
              delivery.
            </li>
            <li>
              The supply of Goods which are, after delivery, according to their
              nature, inseparably mixed with other items.
            </li>
          </ul>
          <p>
            We reserve the right to refuse returns of any merchandise that does
            not meet the above return conditions in our sole discretion.
          </p>
          <p>
            Only regular priced Goods may be refunded. Unfortunately, Goods on
            sale cannot be refunded. This exclusion may not apply to You if it
            is not permitted by applicable law.
          </p>
        </section>

        <section id="returning-process" className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">Returning Goods</h2>
          <p>
            You are responsible for the cost and risk of returning the Goods to
            Us. You should send the Goods at the following address:
          </p>
          <p className="mb-4">
            72, Test stree,
            <br />
            Test Area 12, WB:741235
          </p>
          <p>
            We cannot be held responsible for Goods damaged or lost in return
            shipment. Therefore, We recommend an insured and trackable mail
            service. We are unable to issue a refund without actual receipt of
            the Goods or proof of received return delivery.
          </p>
        </section>

        <section id="gifts" className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">Gifts</h2>
          <p>
            If the Goods were marked as a gift when purchased and then shipped
            directly to you, You&apos;ll receive a gift credit for the value of
            your return. Once the returned product is received, a gift
            certificate will be mailed to You.
          </p>
          <p>
            If the Goods weren&apos;t marked as a gift when purchased, or the
            gift giver had the Order shipped to themselves to give it to You
            later, We will send the refund to the gift giver.
          </p>
        </section>

        <section id="contact" className="mb-8">
          <h3 className="mb-2 text-xl font-medium">Contact Us</h3>
          <p>
            If you have any questions about our Returns and Refunds Policy,
            please contact us:
          </p>
          <ul className="list-disc pl-6">
            <li>
              By email:{" "}
              <a
                href="mailto:debarkamondal@gmail.com"
                className="text-blue-600 hover:underline"
              >
                debarkamondal@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CancellationAndRefund;
