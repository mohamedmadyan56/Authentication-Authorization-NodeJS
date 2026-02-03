const mongoose = require("mongoose");
const slugify = require("slugify");
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    slug: String,
    duration: { type: Number, required: [true, "A tour must have a duration"] },
    price: { type: Number, required: [true, "A tour must have a price"] },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    }, // تصحيح Number
    difficulty: {
      type: String,
      required: [true, "A tour should have difficulty"],
    },
    ratingsAverage: { type: Number, default: 4.5 }, // تصحيح الاسم
    ratingsQuantity: {
      // تصحيح الاسم
      type: Number,
      default: 0,
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a describtion"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
/*
tourSchema.post('save', function(doc, next) {
  console.log('Saved document:', doc);
  next();
});*/
tourSchema.pre(/^find/, function (next) {
  // this هنا يشير للـ Query نفسه، مش للمستند
  this.find({ secretTour: { $ne: true } }); // فلترة الجولات السرية
 
});
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
