export interface Testimonial {
    id: number;
    rating: number;
    comment: string;
    name: string;
    suburb: string;
    status: boolean;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        name: "Sarah Johnson",
        suburb: "Claremont",
        status: true
    },
    {
        id: 2,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        name: "Michael Chen",
        suburb: "Sea Point",
        status: true
    },
    {
        id: 3,
        rating: 4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        name: "Emma Williams",
        suburb: "Constantia",
        status: true
    },
    {
        id: 4,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        name: "David Smith",
        suburb: "Camps Bay",
        status: true
    },
    {
        id: 5,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        name: "Lisa Brown",
        suburb: "Rondebosch",
        status: true
    },
    {
        id: 6,
        rating: 4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        name: "James Wilson",
        suburb: "Newlands",
        status: true
    },
    {
        id: 7,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        name: "Amanda Davis",
        suburb: "Green Point",
        status: true
    },
    {
        id: 8,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        name: "Robert Taylor",
        suburb: "Wynberg",
        status: true
    },
    {
        id: 9,
        rating: 4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        name: "Jennifer Anderson",
        suburb: "Kenilworth",
        status: true
    },
    {
        id: 10,
        rating: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        name: "Mark Thompson",
        suburb: "Muizenberg",
        status: true
    }
];
