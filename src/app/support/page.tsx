import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SupportPage = async () => {
  return (
    <main>
      <section className="flex h-48 flex-col justify-center text-center">
        <h1 className="text-2xl font-semibold">We are here to help</h1>
        <h2 className="font-alex-brush font-smibold mt-4 text-6xl">Always</h2>
      </section>
      <div className="mx-auto rounded-md p-4 shadow md:max-w-2/3">
        <h2 className="mb-4 text-center text-xl font-semibold">Support Form</h2>
        <form className="flex flex-col space-y-4">
          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="Enter Email"
          />
          <Label htmlFor="message">Message:</Label>
          <Textarea
            name="message"
            id="message"
            placeholder="Enter your message"
          />
          <Button>Submit</Button>
          <div className="text-center">
            <p className="text-primary/30 text-sm">or</p>
            <p className="text-primary/80">Email at debarkamondal@gmail.com</p>
          </div>
        </form>
      </div>
    </main>
  );
};
export default SupportPage;
