import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true },
    category: {type: String, required: true },
    description: {type: String, required: true },
    client: {type: String, required: true },
    location: {type: String, required: true },
    year: {type: Number, required: true},
    duration: {type: String, required: true},
    image: {type: String, required: true},
    highlights: [{type: String, required: true}],
    specs: {
        surface: {type: Number, required: true},
        volume: {type: Number, required: true},
        tech: {type: String, required: true}
    }
}, {timestamps: true});

export const Project = mongoose.model('Project', projectSchema);