"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { set, string, z } from "zod";
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
import { getURLInformation } from "@/actions/actions";
import { useState } from "react";
import { usePostHog } from 'posthog-js/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CircleAlert,
  Facebook,
  Linkedin,
  LoaderCircle,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SocialDataType = {
  title: string | "";
  url?: string | undefined;
  imageUrl: string | undefined;
  metaDescription: string | "";
};

const formSchema = z.object({
  url: z.string().regex(/^https:/, "URL must start with https").url().min(1, {
    message: "URL cannot be empty.",
  }),
});

function LinkInput() {
  const [fetching, setFetching] = useState(true); // Track fetching state
  const [error, setError] = useState(null); // Store any errors
  const [errorMessage, setErrorMessage] = useState<string>(''); // Store any errors
  const [ogData, setOgData] = useState<SocialDataType>();
  const [twitterData, setTwitterData] = useState<SocialDataType>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const posthog = usePostHog()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    posthog.capture('preview_submitted')
    setIsLoading(true);
    setFetching(true); // Set fetching state
    setError(null); // Clear previous errors

    try {
      const data = await getURLInformation(values.url);
      // console.log("data", data);

      const shortOgUrl = getHostname(data?.ogUrl);

      // console.log("data.ogImage", data.ogImage);
      const ogDataResult = {
        title: data?.ogTitle || "You're missing a title",
        url: shortOgUrl || "",
        imageUrl: data.ogImage ? data.ogImage[0].url || "" : "",
        metaDescription:
          data?.ogDescription || "You're missing a meta description.",
      };

      const twitterDataResult = {
        title: data?.twitterTitle || "You're missing a title",
        url: shortOgUrl || "",
        // imageUrl: data.twitterImage ? data.twitterImage[0].url || "" : "",
        imageUrl: data.twitterImage ? data.twitterImage[0].url || "" : (data.ogImage ? data.ogImage[0].url || "" : ""),
        metaDescription:
          data?.ogDescription || "You're missing a meta description.",
      };

      setOgData(ogDataResult);
      setTwitterData(twitterDataResult);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching URL information:", error);
      setErrorMessage('Something went wrong.'); // Store the error
      toast.error("Error fetching URL information");
      setIsLoading(false);
      return;
      //   setError(error.message || "An error occurred."); // Handle generic errors
    } finally {
      setFetching(false); // Reset fetching state
    }
  }

  function getHostname(url: string) {
    // console.log('url', url);

    // Create a new URL object
    const parsedUrl = new URL(url);
    // Extract the hostname, split it by dots
    const hostnameParts = parsedUrl.hostname.split(".");
    // If there are more than one part, return the last two parts joined by a dot (domain.com)
    if (hostnameParts.length > 1) {
      return hostnameParts.slice(-2).join(".");
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
                    Place your full URL including https (Must start with https).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={cn("flex justify-end !mt-0")}>
              {isLoading && (
                <Button type="submit">
                  <LoaderCircle className="animate-spin mr-2" />
                  Processing...
                </Button>
              )}
              {!isLoading && <Button type="submit">Submit</Button>}
            </div>
          </form>
        </Form>
      </section>

      {/* Result Display */}
      {errorMessage && (
        <div className="flex justify-center items-center h-[200px]">
          <div className="flex flex-col justify-center items-center">
            <CircleAlert className="mb-4 text-red-400" size={60} />
            <p>{errorMessage}</p>
          </div>
        </div>
      )}


      {errorMessage == "" && !fetching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Facebook */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex")}>
                  <Facebook className="mr-2" />
                  Facebook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-[466px] border">
                  <div className="aspect-video w-full bg-white">
                    {ogData?.imageUrl ? (
                      <img className="w-full object-cover aspect-video" src={ogData?.imageUrl} />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <CircleAlert className="mb-4 text-red-400" size={60} />
                          <p>Image doesn't exist</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="break-words bg-[#f2f3f5] px-[12px] py-[10px] antialiased">
                    <div className="overflow-hidden truncate whitespace-nowrap text-[12px] uppercase leading-[11px] text-[#606770]">
                      {ogData?.url}
                    </div>
                    <div className="block h-[46px] max-h-[46px] select-none overflow-hidden break-words text-left">
                      <div className="mt-[3px] truncate pt-[2px] text-[16px] font-semibold leading-[20px] text-[#1d2129]">
                        {ogData?.title}
                      </div>
                      <div className="mt-[3px] block h-[18px] max-h-[80px] select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[20px] text-[#606770]">
                        {ogData?.metaDescription}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          {/* LinkedIn */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex")}>
                  <Linkedin className="mr-2" />
                  LinkedIn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-[12px] px-[16px] flex bg-[#edf3f8] border">
                  <div className="aspect-video w-[128px] mr-2 rounded-[0.8rem] bg-white">
                    {ogData?.imageUrl ? (
                      <img className="w-full object-cover aspect-video rounded-[0.8rem]" src={ogData?.imageUrl} />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <CircleAlert className="mb-2 text-red-400" size={28} />
                          <p className="text-xs text-center">
                            Image doesn't exist
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="text-[14px] overflow-hidden text-ellipsis text-wrap font-semibold">
                        {ogData?.title}
                      </p>
                      <p className="text-[12px] mt-[0.8rem] overflow-hidden text-ellipsis text-black/60">
                        {ogData?.url}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          {/* Twitter */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex")}>
                  <Twitter className="mr-2" />X (Formally Twitter)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-[512px] max-w-full">
                  <div className="relative">
                    <div className="aspect-video rounded-[16px] overflow-hidden bg-white">
                      {twitterData?.imageUrl ? (
                        <img className="w-full object-cover aspect-video" src={twitterData?.imageUrl} />
                      ) : (
                        <div className="flex justify-center items-center h-full">
                          <div className="flex flex-col justify-center items-center">
                            <CircleAlert
                              className="mb-4 text-red-400"
                              size={60}
                            />
                            <p>Image doesn't exist</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-40 px-[4px] py-[2px] rounded">
                      {twitterData?.title}
                    </div>
                  </div>
                  <p className="text-[13px]">From {twitterData?.url}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </>
  );
}

export default LinkInput;
