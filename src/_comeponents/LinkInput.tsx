"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getURLInfomation } from "@/api/actions";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type SocialDataType = {
  title: string | "";
  url: string | "";
  imageUrl: string | "";
  metaDescription: string | "";
};

const formSchema = z.object({
  url: z.string().url().min(1, {
    message: "URL cannot be empty.",
  }),
});

function LinkInput() {
  const [fetching, setFetching] = useState(false); // Track fetching state
  const [error, setError] = useState(null); // Store any errors
  const [facebookData, setFacebookData] = useState([]);
  const [ogData, setOgData] = useState<SocialDataType>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFetching(true); // Set fetching state
    setError(null); // Clear previous errors

    try {
      const data = await getURLInfomation(values.url);
      console.log(data);
      console.log("title", data.ogTitle);
      const ogDataResult = {
        title: data.ogTitle || "",
        url: data.ogUrl || "",
        imageUrl: data.ogImage[0].url || "",
        metaDescription: data.ogDescription || "",
      };
      setOgData(ogDataResult);
      console.log("ogDataResult", ogDataResult);
      //   setFacebookData(urlInfo)
    } catch (error) {
      console.error("Error fetching URL information:", error);
      //   setError(error.message || "An error occurred."); // Handle generic errors
    } finally {
      setFetching(false); // Reset fetching state
    }
  }

  return (
    <>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Place your full URL including http/https.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section>
      <div className="grid grid-cols-2 gap-6 my-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle className={cn("flex")}>
                <Facebook className="mr-2" />
                Facebook {ogData?.title}
              </CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              {/* {ogData?.imageUrl} */}
              {/* <Image
                src={ogData?.imageUrl}
                width={1000}
                height={800}
                alt="facebook image"
              /> */}
              <div className="aspect-video">
                <img src={ogData?.imageUrl} />
              </div>
            </CardContent>
            <CardFooter className={cn("inline-block")}>
              <p>website url</p>
              <p>Pagetitle</p>
              <p>Meta description</p>
            </CardFooter>
          </Card>
        </section>
      </div>
    </>
  );
}

export default LinkInput;
