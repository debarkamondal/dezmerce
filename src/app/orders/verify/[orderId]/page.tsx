type SearchParams = { [key: string]: string | string[] | undefined };

const OrderVerificationPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  return <div>{JSON.stringify(orderId)}</div>;
};
export default OrderVerificationPage;
