import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils'



function Faqs() {
    const faqsArray = [
        {
            question: 'Why does my URL show image even I didn\'t choose one?',
            answer: 'Some social media platforms picks the first image in the page as the preview image.'
        },
        {
            question: 'What is the best image size for social media preview?',
            answer: 'The best image size for social media preview is 1200x630 pixels.'
        },
        {
            question: 'Why does my URL show different on here and on social media?',
            answer: 'This current preview design is created in June 2024, and the social media platforms may have updated their preview design after that.'
        },
        {
            question: 'I changed the meta tags, but the preview still isn\'t right.',
            answer: 'Social media platforms cache link previews, so it might take some time for the changes to reflect.'
        },
        {
            question: 'Do you have a Chrome extension?',
            answer: 'Yes, we have a Chrome extension. You can download it from the Chrome Web Store.'
        }
    ]
    return (
        <section className='mt-12'>
            <h2 className='text-xl font-bold'>Frequently Asked Questions</h2>
            <div>
                <Accordion type="multiple">
                    {/* <AccordionItem value="item-1">
                        <AccordionTrigger>Why does my URL show image even I didn't choose one?</AccordionTrigger>
                        <AccordionContent>
                            <p className='text-muted-foreground'>
                                Some social media platforms picks the first image in the page as the preview image.
                            </p>
                        </AccordionContent>
                    </AccordionItem> */}
                    {
                        faqsArray.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className={cn('text-left')}>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className='text-muted-foreground'>
                                        {faq.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }

                </Accordion>

            </div>
        </section>
    )
}

export default Faqs