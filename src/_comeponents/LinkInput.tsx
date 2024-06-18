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
import { Facebook, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type SocialDataType = {
  title: string | "";
  url?: string | undefined;
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


      const shortUrl = getHostname(data?.ogUrl);
      console.log("shortUrl", shortUrl);

      const ogDataResult = {
        title: data.ogTitle || "",
        url: shortUrl || "",
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

  function getHostname(url: string) {
    // Create a new URL object
    const parsedUrl = new URL(url);
    // Extract the hostname, split it by dots
    const hostnameParts = parsedUrl.hostname.split('.');
    // If there are more than one part, return the last two parts joined by a dot (domain.com)
    if (hostnameParts.length > 1) {
      return hostnameParts.slice(-2).join('.');
    }
    // Otherwise, return the entire hostname (if no subdomain)
    return hostnameParts[0];
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
                Facebook
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="aspect-video">
                  <img src={ogData?.imageUrl} />
                </div>
                <div className="break-words border-[1px] border-[#dadde1] bg-[#f2f3f5] px-[12px] py-[10px] antialiased">
                  <div className="overflow-hidden truncate whitespace-nowrap text-[12px] uppercase leading-[11px] text-[#606770]">
                    {ogData?.url}
                  </div>
                  <div className="block h-[46px] max-h-[46px] border-separate select-none overflow-hidden break-words text-left">
                    <div className="mt-[3px] truncate pt-[2px] text-[16px] font-semibold leading-[20px] text-[#1d2129]">{ogData?.title}</div>
                    <div className="mt-[3px] block h-[18px] max-h-[80px] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[20px] text-[#606770]">
                      {ogData?.metaDescription}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <Card>
            <CardHeader>
              <CardTitle className={cn("flex")}>
                <Linkedin className="mr-2" />
                LinkedIn
              </CardTitle>
            </CardHeader>
            <CardContent >
              <div className={cn('py-[1.2rem] px-[1.6rem] flex bg-[#edf3f8]')}>
                <div className="aspect-video w-[128px] mr-2">
                  <img src={ogData?.imageUrl} />
                </div>
                <div>
                  <p className="text-[14px] overflow-hidden text-ellipsis text-wrap font-semibold">{ogData?.title}</p>
                  <p className="mt-[0.8rem] overflow-hidden text-ellipsis text-black/60">{ogData?.url}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

export default LinkInput;
