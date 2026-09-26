/**
 * Single source of truth for all certifications.
 * CertificationGrid (the /certifications page) reads from this array.
 * Shape is consistent plain JS objects — no TypeScript types.
 * See content.md §8 for all copy and verified credentials.
 */

const certifications = [
  {
    id: 'java-udemy',
    name: 'Java Training Complete — Course for Java Beginners All in One',
    issuer: 'Udemy (Crunch Coding Institute)',
    date: 'September 23, 2026',
    duration: '4 hours',
    certificateId: 'UC-2a73d416-533e-4427-82ac-b012a38a7cd8',
    image: '/images/certifications/java-certificate.png',
  },
  {
    id: 'python-udemy',
    name: 'Learn to Code in Python 3: Programming Beginner to Advanced',
    issuer: 'Udemy (Ivan Lourenço Gomes, Learn IT University, Andrii Piatakha)',
    date: 'July 4, 2024',
    duration: '5.5 hours',
    certificateId: 'UC-3fa05422-1559-40cb-8871-ee9c34d21334',
    image: '/images/certifications/python-certificate.png',
  },
  {
    id: 'fullstack-bootcamp-udemy',
    name: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy (Dr. Angela Yu)',
    date: 'March 3, 2026',
    duration: '62 hours',
    certificateId: 'UC-b54f4dbb-065a-4114-88ce-0d98d7896ae1',
    image: '/images/certifications/fullstack-bootcamp-certificate.png',
  },
];

export default certifications;
