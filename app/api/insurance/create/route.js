import dbConnect from "@/lib/dbConnect";
import InsuranceModel from "@/model/Insurance";


export const POST = async (request) => {
    await dbConnect();

    try {
        const { userid,name, mobile_no, vehicle_no, rc, rc_no, aadharcard, aadharcard_no, pan_card, pan_card_no, old_policy, old_policy_no,status } = await request.json();
        const alreadyinsurance = await InsuranceModel.findOne({ vehicle_no });

        if (alreadyinsurance) {
            return Response.json(
                {
                    message: "insurance already exist with provided vehicle_no!",
                    success: false,
                },
                { status: 400 }
            );
        }

        
        const createdInsurance = await InsuranceModel.create({
            userid,
            name,
            mobile_no,
            vehicle_no,
            rc_no,
            rc,
            aadharcard_no,
            aadharcard,
            pan_card_no,
            pan_card,
            old_policy_no,
            old_policy,
            status
        });

        return Response.json(
            {
                message: "Insurance registration completed!",
                success: true,
                insurance: createdInsurance,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error on insurance registration:", error);
        return Response.json(
            {
                message: "Error on insurance registration!",
                success: false,
            },
            { status: 500 }
        );
    }
};
