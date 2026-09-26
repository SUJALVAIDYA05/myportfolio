/**
 * Single source of truth for all competitive achievements.
 * AchievementList (the /certifications page Section B) reads from this array.
 * Each achievement includes an `images` array feeding its Carousel component.
 * See content.md §9 for all copy and placements.
 */

const achievements = [
  {
    id: 'hackarena-2k26',
    competition: 'HackArena 2K26',
    placement: '1st Runner Up (2nd Place)',
    context:
      'Secured 1st Runner Up at HackArena 2K26, organized by Jain College of Engineering and Technology, Hubballi, in association with Unstop. My team, Code Blooded, was awarded a ₹5,000 cash prize for developing TrustLedger, a milestone-based escrow platform.',
    images: [
      '/images/achievements/hackarena-2k26/1.jpg', // working session in the lab
      '/images/achievements/hackarena-2k26/2.jpg', // team holding the cheque
      '/images/achievements/hackarena-2k26/3.jpg', // solo photo with the cheque
      '/images/achievements/hackarena-2k26/4.jpg', // prize handover with faculty/judges
    ],
    imageAlts: [
      'Team Code Blooded working session in the lab during HackArena 2K26',
      'Team Code Blooded holding the HackArena 2K26 1st Runner Up cheque',
      'Sujal Vaidya solo photo with the HackArena 2K26 1st Runner Up cheque',
      'Prize handover ceremony with faculty and judges at HackArena 2K26',
    ],
  },
  {
    id: 'chakravyuha-vaibhav',
    competition: 'Chakravyuha — Vaibhav',
    placement: '1st Prize',
    context:
      'Won 1st Prize in Chakravyuha, a competitive event held as part of Vaibhav.',
    images: [
      '/images/achievements/chakravyuha/1.jpg', // on-stage award presentation
      '/images/achievements/chakravyuha/2.jpg', // receiving the certificate/memento
    ],
    imageAlts: [
      'On-stage award presentation at Chakravyuha — Vaibhav',
      'Sujal Vaidya receiving the 1st Prize certificate and memento at Chakravyuha',
    ],
  },
];

export default achievements;
