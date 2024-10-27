interface Inquiry {
  name: string;             
  profile: string;          
  title: string;
  socialMediaType: string;
  socialMediaHandle: string;
  dateTime: string;
  icon: string;
  profilePic: string;
}

export const inquiries: Inquiry[] = [
  {
    name: 'Michael Green',
    profile: 'Business Investor', // Updated position
    title: 'Market Expansion Strategies',
    socialMediaType: 'Gmail',
    socialMediaHandle: 'MG@gmail.com',
    dateTime: '2024.08.14, 07:46 AM',
    icon: 'check',
    profilePic: '/images/john.jpg',
  },
  {
    name: 'Emily Roberts',
    profile: 'Business Investor', // Updated position
    title: 'Challenges in Attracting and Retaining Customers',
    socialMediaType: 'WhatsApp',
    socialMediaHandle: '@emily_roberts_wa',
    dateTime: '2024.10.16, 10:35 AM',
    icon: 'send',
    profilePic: '/images/bob.jpg',
  },
  {
    name: 'Liam Martinez',
    profile: 'Business Investor', // Updated position
    title: 'Social Media Engagement',
    socialMediaType: 'Instagram',
    socialMediaHandle: '@liam_martinez',
    dateTime: '2024.07.25, 03:57 PM',
    icon: 'check',
    profilePic: '/images/noone.jpg',
  },
  {
    name: 'Candice',
    profile: 'Marketing', // Updated position
    title: 'Digital Marketing Campaign',
    socialMediaType: 'Phone',
    socialMediaHandle: '+65 93321312',
    dateTime: '2024.07.31, 07:06 AM',
    icon: 'check',
    profilePic: '/images/sam.jpg',
  },
];
