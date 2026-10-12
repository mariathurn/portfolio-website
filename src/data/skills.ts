// Skills shown as bubbles in the Skill Runner game and in the overview under it. Edit freely.

export type CategoryId = 'frontend' | 'design' | 'software' | 'ai';

export const categories: { id: CategoryId; label: string; color: string }[] = [
    { id: 'frontend', label: 'Frontend', color: '#f5b83d' },
    { id: 'design', label: 'Design', color: '#f28bb0' },
    { id: 'software', label: 'Software', color: '#72d8aa' },
    { id: 'ai', label: 'AI', color: '#b9a2f5' },
];

export type Skill = {
    name: string;
    category: CategoryId;
};

const byCategory: Record<CategoryId, string[]> = {
    frontend: ['React', 'TypeScript', 'React Native', 'REST APIs', 'HTML', 'CSS', 'UI Design'],
    design: ['Graphic Design', 'Figma', 'Typography', 'Illustration', 'Photography', '3D Visualization', 'Presentation Skills'],
    software: ['Python', 'C#', 'Java', 'Software Engineering', 'Game Development', 'Unity', 'Git'],
    ai: ['NLP', 'Transformer Models', 'Explainable AI', 'Computer Vision', 'Machine Learning', 'Fine-Tuning', 'Scientific Programming'],
};

export const skills: Skill[] = categories.flatMap(({ id }) =>
    byCategory[id].map((name) => ({ name, category: id })),
);

export const categoryColor = (id: CategoryId) =>
    categories.find((category) => category.id === id)?.color ?? '#fff';
