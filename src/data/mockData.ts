import { Boat, Route, Testimonial, FAQItem } from '../types';

export const boats: Boat[] = [
  {
    id: '1',
    name: 'Coastal Cruiser',
    capacity: 18,
    length: 22,
    hourlyRate: 150,
    dailyRate: 950,
    amenities: ['Bluetooth Sound', 'Bimini Top', 'Cooler & Ice', 'Swimming Ladder'],
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Paradise Explorer',
    capacity: 18,
    length: 24,
    hourlyRate: 180,
    dailyRate: 1150,
    amenities: ['Premium Sound System', 'Bimini Top', 'Large Cooler', 'Swimming Platform', 'Extra Seating'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Luxury Yacht Pontoon',
    capacity: 18,
    length: 26,
    hourlyRate: 220,
    dailyRate: 1450,
    amenities: ['Premium Audio', 'Full Shade', 'Built-in Coolers', 'Water Slide', 'Deluxe Seating', 'LED Lighting'],
    image: '/hero-pontoon-miami.jpg'
  }
];

export const routes: Route[] = [
  {
    id: '1',
    name: 'Las Olas & Intracoastal Cruise',
    description: 'Cruise through Fort Lauderdale\'s famous Intracoastal Waterway, passing luxury waterfront homes and the vibrant Las Olas Boulevard area.',
    duration: '3 hours',
    highlights: ['Las Olas views', 'Luxury waterfront homes', 'Perfect for sightseeing'],
    image: '/Night_Intracoastal2.jpg'
  },
  {
    id: '2',
    name: 'Fort Lauderdale Sandbar',
    description: 'Anchor at the popular Fort Lauderdale sandbar with stunning waterfront views. Perfect for swimming and relaxation.',
    duration: '4 hours',
    highlights: ['Popular sandbar destination', 'Crystal clear waters', 'Ideal for photos'],
    image: '/Sandbar.png'
  },
  {
    id: '3',
    name: 'Intracoastal Waterway Tour',
    description: 'Explore the beautiful Fort Lauderdale Intracoastal Waterway, passing luxury yachts, waterfront mansions, and the Port Everglades inlet.',
    duration: '4 hours',
    highlights: ['Luxury yachts', 'Waterfront mansions', 'Port Everglades views'],
    image: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png'
  }
];

// Real Google reviews (verbatim; truncated ones end with an ellipsis as shown
// on Google). Update alongside the 5.0 / 95-review badge in GuestReviews.tsx.
export const testimonials: Testimonial[] = [
  { id: '73', name: 'Ryan Yankee', rating: 5, text: 'Fantastic trip. Shoutout Taco.', date: 'July 2026' },
  { id: '74', name: 'Janessa Hughes', rating: 5, text: 'We had the best time on with captain Taco! Great stories and good times!', date: 'July 2026' },
  { id: '75', name: 'The Balloon Co.', rating: 5, text: 'Amazing time on the Tiki Taco!!! Thank you Taco, we had a great time!! We will come again!', date: 'July 2026' },
  { id: '76', name: 'Carolina Castillo', rating: 5, text: 'Really nice, affordable and fun. Great for sightseeing.', date: 'July 2026' },
  { id: '1', name: 'Julie Sullivan', rating: 5, text: 'Tiki Taco was amazing!! We had such a great time cruising around the intercostal listening to Taco’s stories about the area. Would highly recommend for tourists AND locals!', date: 'July 2026' },
  { id: '2', name: 'Rick Buscavage', rating: 5, text: 'No other tour can possibly compare to Taco’s Tiki Tour! This comfortable pontoon boat has every amenity you need, to enjoy a sail with the most knowledgeable Captain in South Florida.', date: 'July 2026' },
  { id: '3', name: 'Sarah Rocca', rating: 5, text: 'We had an amazing sunset cruise with Taco on his tiki boat. He’s a wealth of information about the history and houses of Fort Lauderdale. If you’re looking for a great day out on the water this is the way to do it!!', date: 'July 2026' },
  { id: '4', name: 'Curtis Lee Tollefsrud', rating: 5, text: 'Taco and Captain Lue were great and treated our family like we had known each other forever. Would definitely cruise with them again.', date: 'July 2026' },
  { id: '5', name: 'Mary Wade', rating: 5, text: 'This was a wonderful cruise!! Definitely recommend for a good time. Taco the coordinator was great, the guy driving Lue was cool too!! Looking for a great cruise, this is your ride!!', date: 'July 2026' },
  { id: '6', name: 'Stephanie Kluver', rating: 5, text: 'We had a great cruise on the Intracoastal with a bunch of friends. Taco was a great captain and provided a lot of insight on the sights along the way!!! Highly recommend a cruise!!!', date: 'July 2026' },
  { id: '7', name: 'Lymarie Ramirez', rating: 5, text: 'Went with friends. Captain Taco was amazing and accommodating to our needs. Music was great and we had a great time. Will definitely come back again. Thanks Captain Taco!', date: 'July 2026' },
  { id: '8', name: 'Yamiles', rating: 5, text: 'I had an absolutely wonderful experience aboard this beautiful boat. From the moment we stepped on board, it was clear that Captain Taco is passionate about providing an exceptional and memorable experience…', date: 'July 2026' },
  { id: '9', name: 'Alba Ferrer Rodríguez', rating: 5, text: 'We had an amazing experience! The trip was well organized from start to finish, and everything exceeded our expectations. The crew was friendly, professional, and made us feel comfortable throughout the entire journey.', date: 'July 2026' },
  { id: '10', name: 'Sthefany Silva', rating: 5, text: 'Loved Tiki Taco cruises, great for having a fun time', date: 'July 2026' },
  { id: '11', name: 'Gabriel Gritzmaker', rating: 5, text: 'It’s a fun vibe and beautiful views', date: 'July 2026' },
  { id: '12', name: 'Jamie Karen', rating: 5, text: 'Taco is the best!! Would only go on his boats!!!', date: 'July 2026' },
  { id: '13', name: 'Melanie Verschoore', rating: 5, text: 'Taco is the best! So accommodating and super cool', date: 'July 2026' },
  { id: '14', name: 'Sheyla Montgomery', rating: 5, text: 'My boat tours with Tiki Taco are always wonderful. A cooler full of drinks, great music, and beautiful scenery. They were unforgettable moments! Our group loved the tour, and we had so much fun. I highly recommend this very enjoyable experience! Thank you, Captain Taco and your team.', date: 'June 2026' },
  { id: '15', name: 'Patrick Heller', rating: 5, text: 'If you’re lucky enough to get Captain Taco and First Mate Finn, just know you’re…', date: 'June 2026' },
  { id: '16', name: 'Adam Newburger', rating: 5, text: 'Taco and his crew are the most incredible people I’ve had the privilege of being on the water with. If you have a chance to go out with them, don’t wait!!', date: 'June 2026' },
  { id: '17', name: 'Hardy Moore', rating: 5, text: 'Hands down the best Fort Lauderdale boat experience I have been a part of. We brought a group of 10 friends out for a cruise up the Intracoastal…', date: 'June 2026' },
  { id: '18', name: 'Taylor Artz', rating: 5, text: 'The most amazing boat for me and my friends! They were incredibly accommodating and had amazing additions to our trip! So much fun would recommend!', date: 'June 2026' },
  { id: '19', name: 'Chris Pearson', rating: 5, text: 'Awesome time. Don’t think twice - book a charter with Taco', date: 'June 2026' },
  { id: '20', name: 'Matt Lisi', rating: 5, text: 'Taco makes this all worth it. Great price, great vibes. Only person in Ft. Lauderdale you should book with', date: 'June 2026' },
  { id: '21', name: 'Roy Egrie', rating: 5, text: 'Taco (Lewis) awesome captain and mate Lou!! Great ride through the intercostal and sandbar party!!! The Jersey Shore - Atlantic City Krew', date: 'June 2026' },
  { id: '22', name: 'Vanessa Scholey', rating: 5, text: 'Great boat! Taco is fabulous and knows all the local spots. A+ vibe!!!', date: 'June 2026' },
  { id: '23', name: 'Anthony Hernandez', rating: 5, text: 'It was a phenomenal experience overall. It’s a great opportunity to have a great time in Fort Lauderdale.', date: 'June 2026' },
  { id: '24', name: 'Aidan Ingalls', rating: 5, text: 'Captain Taco kept us safe while partying like crazy, 10 out of 10 would recommend.', date: 'June 2026' },
  { id: '25', name: 'Jalyca Santos', rating: 5, text: 'BEST BOAT IVE EVER BEEN ON FOR REAL I WOULD GO ON 100 TIMES AGAIN THANK YOU SO MUCH', date: 'June 2026' },
  { id: '26', name: 'Penny Wright', rating: 5, text: 'Taco and Lou were amazing!!! What a fun trip!!!', date: 'June 2026' },
  { id: '27', name: 'Victoria Alonso', rating: 5, text: 'They did an incredible job of taking care of our group!', date: 'June 2026' },
  { id: '28', name: 'Chris Kobler', rating: 5, text: 'Amazing time, great stories, very friendly and knowledgeable!', date: 'June 2026' },
  { id: '29', name: 'Alexia Berg', rating: 5, text: 'Captain Taco and Crew were amazing!', date: 'June 2026' },
  { id: '30', name: 'Maia', rating: 5, text: 'Fantastic service, clean boat, a total vibe!!!', date: 'June 2026' },
  { id: '31', name: 'Kyy', rating: 5, text: 'The best I’ve ever experienced', date: 'June 2026' },
  { id: '32', name: 'Henry Brandmark', rating: 5, text: 'Awesome day for bachelor party', date: 'June 2026' },
  { id: '33', name: 'Luci Civetti', rating: 5, text: 'Great crew! Ty!', date: 'June 2026' },
  { id: '34', name: 'Bobby Donovan', rating: 5, text: 'Taco and Lou are the best', date: 'June 2026' },
  { id: '35', name: 'Armando Erbiti', rating: 5, text: 'Awesome experience', date: 'June 2026' },
  { id: '36', name: 'Max Greenberg', rating: 5, text: 'Legendary captain', date: 'June 2026' },
  { id: '37', name: 'Samira Musali', rating: 5, text: 'The best', date: 'June 2026' },
  { id: '38', name: 'Joel Sims', rating: 5, text: 'Taco and Louie were the best sea captains on the water! 100000% would recommend', date: 'June 2026' },
  { id: '39', name: 'Michelle Urdaneta', rating: 5, text: 'The best! Tiki Taco was sooo fun', date: 'June 2026' },
  { id: '40', name: 'Alycia Silber', rating: 5, text: 'Taco is a great time! Make sure you use him', date: 'June 2026' },
  { id: '41', name: 'Haley Rosen', rating: 5, text: 'Great experience!! We had so much fun and captains were amazing!!', date: 'June 2026' },
  { id: '42', name: 'Josh Ortloff', rating: 5, text: 'Taco was awesome, loved the stories he told and the tour he provided. Can’t recommend enough', date: 'June 2026' },
  { id: '43', name: 'Taylor Knowles', rating: 5, text: 'John was an awesome captain! So knowledgeable and had tons of fun facts about the area. The ride was super smooth and boat was very clean. We had a blast once we anchored and there were lots of boats around to hangout. 12/10 experience!', date: 'May 2026' },
  { id: '44', name: 'Brian Baumert', rating: 5, text: 'Great captain. We were able to customize our cruise. We had a group of 12 and it was great. I highly recommend.', date: 'May 2026' },
  { id: '45', name: 'Brandon Woolf', rating: 5, text: 'Taco and his crew were great. Lani was so awesome and knowledgeable.', date: 'May 2026' },
  { id: '46', name: 'Laura Baumert', rating: 5, text: 'Tiki Taco was INCREDIBLE!!! What a fantastic day with friends and family! Thanks Taco for Special Memories!', date: 'May 2026' },
  { id: '47', name: 'Jennilyn Woolf', rating: 5, text: 'Such a fun time!! Great experience, thank you!', date: 'May 2026' },
  { id: '48', name: 'M. Murphy Smith', rating: 5, text: 'It rained, but they were friendly, and it was a nice chill tour.', date: 'May 2026' },
  { id: '49', name: 'Jerry Bock', rating: 5, text: 'The day was awesome, Taco was a great Captain.', date: 'May 2026' },
  { id: '50', name: 'John Bosley', rating: 5, text: 'Best boat in town', date: 'May 2026' },
  { id: '51', name: 'Betsabe Chirinos', rating: 5, text: 'Very nice experience!!!', date: 'May 2026' },
  { id: '52', name: 'Ryan O’Connell', rating: 5, text: 'Great time!', date: 'May 2026' },
  { id: '53', name: 'Phelicha Silva', rating: 5, text: 'John killed it, had an amazing time and he knew everything about the area. 10/10!', date: 'May 2026' },
  { id: '54', name: 'Ricardo Ruiz', rating: 5, text: 'Excellent trip, very interesting and enjoyable. Taco is the best pilot!!', date: 'May 2026' },
  { id: '55', name: 'John Bosley', rating: 5, text: 'Best time ever can’t wait to go again boat was clean they had good music and crew was very nice', date: 'April 2026' },
  { id: '56', name: 'Dylan Barr', rating: 5, text: 'Taco is a great guy. Very nice boat and a fun time.', date: 'April 2026' },
  { id: '57', name: 'Nathan Beam', rating: 5, text: 'Taco is first class. You won’t be upset with booking him!', date: 'April 2026' },
  { id: '58', name: 'Paul Hicks', rating: 5, text: 'Taco is the man!!! It was an incredible time!!', date: 'April 2026' },
  { id: '59', name: 'Justin Whitehorn', rating: 5, text: 'We had an amazing time aboard the Tiki Taco! Even though I’m from the area and have seen these waterways plenty of times, it was such a fun and refreshing way to take in the sights…', date: 'March 2026' },
  { id: '60', name: 'Darin Tonks', rating: 5, text: 'Took Tiki Taco out for a late afternoon/early evening bachelor party cruising around bar hopping. The boat was set up perfect and everyone onboard had an excellent time. We will definitely be using Taco again. Thanks for a great time.', date: 'March 2026' },
  { id: '61', name: 'Jordan Stack', rating: 5, text: 'John and Taco took real good care of me and my group. Great time out at the sand bar. 10/10', date: 'March 2026' },
  { id: '62', name: 'Blake J. Mahedy', rating: 5, text: 'Taco is the absolute best! If you want to have a good time along with just a great personal experience, go with him!', date: 'March 2026' },
  { id: '63', name: 'Jerry Montagna', rating: 5, text: 'Fantastic experience!!! Sooooo much fun. Service was spectacular, Taco and his crew…', date: 'March 2026' },
  { id: '64', name: 'Jeff Cheaney', rating: 5, text: 'I’ve been out with Capt. Taco and his crew many times on the water and always a blast! Super safe and takes care of his customers. Highly recommended!', date: 'March 2026' },
  { id: '65', name: 'Carl Underhill', rating: 5, text: 'Amazing boat ride with Taco. Made the perfect bachelor party experience', date: 'March 2026' },
  { id: '66', name: 'Vicky Brienza', rating: 5, text: 'Best time cruising the inter-coastal. Highly recommend Tiki Taco cruises!', date: 'March 2026' },
  { id: '67', name: 'Adam Weins', rating: 5, text: 'A great cruise, worth every penny', date: 'March 2026' },
  { id: '68', name: 'Kevin Boyle', rating: 5, text: 'Taco is the man and is a wicked chill captain, on god.', date: 'March 2026' },
  { id: '69', name: 'Edward Brown', rating: 5, text: 'I had an amazing time on Captain Taco’s boat! The vibe was relaxed but lively — blasting music, waving at other boats, and just enjoying the water. It felt like a mix between a little guided trip (he pointed out interesting spots) and a…', date: 'February 2026' },
  { id: '70', name: 'Ashley Brown', rating: 5, text: 'Tiki Taco Cruises was an absolute blast! Our group had such a fun, relaxing day cruising around—great music, great views, and just an overall amazing vibe. The crew was friendly, attentive, and made everything super easy.', date: 'February 2026' },
  { id: '71', name: 'Aylin Ulkealan', rating: 5, text: 'What a beautiful day out on the water! I had a wonderful time on Captain Taco’s boat and truly felt like a local. He had coolers filled with ice ready for our group. We cruised through the intercostal and different neighborhoods…', date: 'February 2026' },
  { id: '72', name: 'Marisa Newman', rating: 5, text: 'Tiki Taco cruise was a fun day on the water! He picked us up smoothly and welcomed us nicely. We wanted to gather our friends together and Taco the captain made the day worth it! You are welcome to bring your own snacks and drinks…', date: 'February 2026' }
];

export const faqs: FAQItem[] = [
  {
    question: 'What to bring',
    answer: 'Sunscreen, bathing attire, sunglasses, drinks, food or snacks, and inflatable water floats/toys.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Free cancellation up to 48 hours before your scheduled departure. Cancellations within 48 hours receive a 50% refund. Weather-related cancellations receive a full refund or free rescheduling.'
  },
  {
    question: 'Is fuel included in the price?',
    answer: 'Fuel is not included in the base rental price. You will fuel the boat before returning, similar to a car rental. Alternatively, we offer a fuel package option for $100 that covers typical usage.'
  },
  {
    question: 'Can we bring alcohol?',
    answer: 'Yes! You are welcome to bring beer, wine, and cocktails. We provide a large cooler with ice. Please drink responsibly. If you have a captain with you, they will ensure everyone stays safe on the water.'
  },
  {
    question: 'How early should we arrive?',
    answer: 'Please arrive 15 minutes before your scheduled departure time. This allows time for orientation, safety briefing, and departure. Late arrivals may result in reduced rental time.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety is our priority. If weather conditions are unsafe, we will contact you to reschedule or provide a full refund. We monitor forecasts closely and make decisions based on Coast Guard recommendations.'
  },
  {
    question: 'Are pets allowed?',
    answer: 'Well-behaved dogs are welcome! Please bring a leash and clean up after your pet. There is a $25 pet cleaning fee. Let us know in advance so we can prepare the boat accordingly.'
  },
  {
    question: 'Notes',
    answer: 'Crew gratuities are appreciated.'
  }
];
