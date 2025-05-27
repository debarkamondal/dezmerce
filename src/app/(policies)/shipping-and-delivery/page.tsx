import Link from "next/link";

const ShippingAndDelivery = () => {
  return (
    <>
      <h1 className="my-8 text-3xl font-semibold">Shipping and Delivery</h1>
      <p>
        This shipping policy explains how Debarka Mondal (doing business as
        “Dezire”) operates its shipping procedures and how we strive to meet
        your expectations with every order. Whether you’re a first-time buyer or
        a returning customer, we want to ensure that your experience with us is
        smooth and satisfactory, right from placing your order to the moment it
        arrives at your doorstep.
      </p>
      <p>
        Please read this shipping policy together with our{" "}
        <Link href="https://www.dkmondal.in/terms-and-conditions">
          terms and conditions
        </Link>{" "}
        to familiarize yourself with the rest of our general guidelines.
      </p>
      <div className="index">
        <h3>Table of contents</h3>
        <ol className="index">
          <li>
            <Link href="#shipping-and-delivery-options">
              Shipping and Delivery Options
            </Link>
          </li>
          <li>
            <Link href="#delayed-orders">Delayed Orders</Link>
          </li>
          <li>
            <Link href="#returns-and-exchanges">Returns and Exchanges</Link>
          </li>
          <li>
            <Link href="#contact-information">Contact Information</Link>
          </li>
        </ol>
      </div>
      <h2 id="shipping-and-delivery-options">Shipping and Delivery Options</h2>
      <p>
        We offer a variety of shipping options to suit the needs of our
        customers.
      </p>
      <h3>Free Shipping</h3>
      <p>
        As part of our commitment to an exceptional shopping experience, we are
        pleased to offer free shipping.
      </p>
      <h3>Flat Rate Shipping</h3>
      <p>
        To ensure affordability and simplicity in our shipping process, we
        provide a flat rate shipping option.
      </p>
      <h3>Shipping Methods</h3>
      <p>
        We offer a variety of shipping options to suit the needs of our
        customers:
      </p>
      <ul>
        <li>Standard: 5 to 7 business days</li>
      </ul>
      <p>
        We strive for a swift preparation process and orders are typically
        processed and dispatched within 1 business day so that customers can
        receive their items promptly.
      </p>
      <p>
        In certain situations, we may collaborate with a third-party supplier
        who might handle our inventory and take charge of shipping your
        products.
      </p>
      <h2 id="delayed-orders">Delayed Orders</h2>
      <p>
        Unexpected delays can occur due to various reasons such as logistic
        challenges, inclement weather, high demand, or carrier issues. We are
        committed to handling these situations with transparency and efficiency.
        In the event of a delay, our priority is to keep you informed. We will
        promptly notify you with updates on the status of your order and the
        expected new delivery time. Our goal is to provide clear and accurate
        information so you can plan accordingly.
      </p>
      <p>
        Understanding the inconvenience caused by delays, we offer options to
        maintain your satisfaction. If your order is significantly delayed, you
        will have the choice to continue with the order, modify it, or cancel it
        for a full refund. Our customer service team is always available to
        assist with any changes to your order.
      </p>
      <h2 id="returns-and-exchanges">Returns and Exchanges</h2>
      <p>
        If you have any questions about refunds, returns or exchanges, please
        review our{" "}
        <Link href="https://www.dkmondal.in/cancelltion-and-refund">
          refund policy
        </Link>
        .
      </p>
      <h2 id="contact-information">Contact Information</h2>
      <p>
        If you have any questions or concerns regarding our shipping policy, we
        encourage you to contact us using the details below:
      </p>
      <ul>
        <li>
          <Link href="mailto:debarkamondal@gmail.com">
            debarkamondal@gmail.com
          </Link>
        </li>
      </ul>
      <p>This document was last updated on May 19, 2025</p>
    </>
  );
};
export default ShippingAndDelivery;
