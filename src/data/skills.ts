// Skills shown as bricks in the Skill Breakout game. Edit freely.

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
    blurb: string;
};

export const skills: Skill[] = [
    { name: 'React', category: 'frontend', blurb: 'My go-to for interfaces – this site included.' },
    { name: 'TypeScript', category: 'frontend', blurb: 'Catches my bugs before users do.' },
    { name: 'JavaScript', category: 'frontend', blurb: 'Behind everything interactive I build.' },
    { name: 'HTML', category: 'frontend', blurb: 'Semantic, accessible markup as the base.' },
    { name: 'CSS', category: 'frontend', blurb: 'Layouts, animations – and that Nyan Cat.' },
    { name: 'Responsive', category: 'frontend', blurb: 'Looks right from phone to big screen.' },

    { name: 'Figma', category: 'design', blurb: 'Where my interfaces start, before any code.' },
    { name: 'UI Design', category: 'design', blurb: 'Clean, clear interfaces with an eye for detail.' },
    { name: 'UX', category: 'design', blurb: 'Designing for how people actually use things.' },
    { name: 'Prototyping', category: 'design', blurb: 'Clickable ideas before codeable ones.' },
    { name: 'Graphic Design', category: 'design', blurb: 'My Bachelor’s: typography, colour and composition.' },
    { name: 'Adobe CC', category: 'design', blurb: 'Photoshop, Illustrator & InDesign.' },

    { name: 'Python', category: 'software', blurb: 'Data, machine learning and quick scripts.' },
    { name: 'C#', category: 'software', blurb: 'Gameplay code for Donut Wars.' },
    { name: 'Unity', category: 'software', blurb: 'Built a 2D survival game with it.' },
    { name: 'Node.js', category: 'software', blurb: 'Small backends with Express.' },
    { name: 'REST APIs', category: 'software', blurb: 'Connecting frontends to data.' },
    { name: 'Git', category: 'software', blurb: 'Version control for everything I build.' },

    { name: 'Transformers', category: 'ai', blurb: 'Fine-tuned XLM-R and mT5 for my thesis.' },
    { name: 'NLP', category: 'ai', blurb: 'Named entity recognition in 3 languages.' },
    { name: 'Fine-tuning', category: 'ai', blurb: 'Adapting big models to specific tasks.' },
    { name: 'Explainable AI', category: 'ai', blurb: 'SHAP & Integrated Gradients: why models decide.' },
];

export const categoryColor = (id: CategoryId) =>
    categories.find((category) => category.id === id)?.color ?? '#fff';
