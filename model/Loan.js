import mongoose, { Schema } from "mongoose";

const LoanSchema = new Schema(
  {
  
  },
  { timestamps: true }
);

const LoanModel =
  mongoose.models.loaninfo || mongoose.model("loaninfo", LoanSchema);

export default LoanModel;
