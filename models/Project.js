import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
    },
    // prManager: {
    //   type: String,
    // },
    projectAddress: {
      type: String,
    },
    aboutMarket: {
      type: String,
    },
    aboutCity: {
      type: String,
    },
    // propertyType: {
    //   type: String,
    // },
    projectType: {
      type: ObjectId,
      ref: "Category",
      // required: true,
    },
    proertySize: {
      type: String,
    },
    totalFloor: {
      type: String,
    },
    totalRoom: {
      type: String,
    },
    totalBedRoom: {
      type: String,
    },

    totalBathRooms: {
      type: String,
    },
    aboutProperty: {
      type: String,
    },
    managementInfo: {
      type: String,
    },
    exitStrategy: {
      type: String,
    },
    googleMapLink: {
      type: String,
    },

    totalProjectValue: {
      type: Number,
    },
    minimumInvestmentValue: {
      type: Number,
    },
    // perInvestmentValue: {
    //   type: Number,
    // },
    // underlyingAssetPrice: {
    //   type: Number,
    // },
    notaryFee: {
      type: Number,
    },

    sharikanaFee: {
      type: Number,
    },
    yearlyReturnValue: {
      type: Number,
    },

    halfYearlyRetunrValue: {
      type: Number,
    },

    monthlyReturnValue: {
      type: Number,
    },

    avarageReturnValue: {
      type: Number,
    },
    projectAnnualCapitalAppreciation: {
      type: Number,
    },

    // documents: Object,

    googleDriveLinks: Object,

    aboutPropertyDistrict: {
      type: String,
    },
    aboutPropertyCity: {
      type: String,
    },
    timelines: Object,

    projectPicture: {
      type: Array,
    },
    projectPdf: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
