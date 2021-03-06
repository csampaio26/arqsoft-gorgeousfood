import * as mongoose from 'mongoose'
import { Languages, Default } from '../../infra/extensions/languages.extensions'
import * as mongooseIntl from 'mongoose-intl'
import * as mongoose_delete from 'mongoose-delete'
import moment = require('moment')

export interface IMeal {
    description: string
}

export const MealModel = new mongoose.Schema(
    {
        description: {
            type: String,
            required: 'Enter the description',
            intl: true,
        },
        number: {
            type: Number,
            required: 'Enter the number',
            unique: true,
            default: moment().unix(),
        },
        descriptors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'descriptors',
                required: 'Enter the descriptors.',
            },
        ],
        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
                required: 'Enter the ingredients.',
            },
        ],
        meal_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'meal_type',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

MealModel.plugin(mongoose_delete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true,
})
MealModel.plugin(mongooseIntl, {
    languages: Languages,
    defaultLanguage: Default,
    virtualObject: true,
})

export const Meal = mongoose.model('meals', MealModel)
