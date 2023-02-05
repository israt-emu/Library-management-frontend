import React from "react";

const ArticleDetails = () => {
  return (
    <div>
      <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800">
        <div className="flex flex-col  mx-auto overflow-hidden rounded">
          <img
            src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt=""
            className="w-full h-60 sm:h-96 bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6  sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50">
            <div className="space-y-2">
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block text-2xl font-semibold sm:text-3xl"
              >
                The Horrors of log(log(log(t)))
              </a>
              <p className="text-xs text-gray-600">
                By
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline"
                >
                  Leroy Jenkins
                </a>
              </p>
            </div>
            <div className="text-gray-800 text-xl">
              <p>
                Time and again, collaboration has proven to be a key driver of
                scientific and technological innovation. So it follows that some
                of the greatest advances have come from intellectual hubs set up
                for this very purpose. Today Silicon Valley is synonymous with
                this idea – but it’s just one in a long line of institutions
                that paved the way before it. One such example came from
                Baghdad, Iraq, during the Islamic Golden Age in the fourth
                Islamic century (tenth century AD). It was around this time,
                when Europe was living through its so-called “Dark Ages”, the
                House of Wisdom (Bayt-al Hikmah) was born. It was here that many
                great works from Persia, China, India and Greece were collected
                and translated into Arabic, including works by Aristotle and
                Euclid. This illustration showing Aristotle teaching a student
                is from a manuscript attributed to Assyrian physician and writer
                Jabril ibn Bukhtishu (8th-9th century) Wikimedia This culturally
                and linguistically diverse environment gave rise to innovations
                that would have lasting legacies in fields including algebra,
                geography, astronomy, medicine and engineering. Automata with
                talent During its tenure of some three-and-a-half centuries, the
                House of Wisdom was populated by a number of multitalented
                thinkers. Among these were the Banu Musa brothers – three
                ninth-century Persian scholars who lived in Baghdad. The
                brothers formed a multidisciplinary team: one was a
                mathematician, one an astronomer and one an engineer. They
                translated works from other languages into Arabic, sponsored
                other translators and invested money in buying rare manuscripts.
                They were also involved in politics and the development of urban
                infrastructure, and were even musically talented. But arguably
                their most tangible contribution was to automated machines, or
                automata. One of their works published in 850 AD, The Book of
                Ingenious Devices, translated as The Book of Tricks, describes
                machines that served as precursors to modern robots. These
                automata included mechanical musical instruments and a
                self-playing steam-powered robotic flute player. Vrije
                University of Amsterdam’s Teun Koetsier considers this
                mechanical musician to be the world’s first programmable
                machine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
