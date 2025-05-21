import { redirect } from "next/navigation";

const POST = async (request: Request) => {
  // const data = await fetch("https://api.dkmondal.in/test/payments/verify", {
  //   method: "POST",
  //   body: await request.text(),
  // });
  console.log(await request.bytes());
  redirect("/about");
};
export { POST };
