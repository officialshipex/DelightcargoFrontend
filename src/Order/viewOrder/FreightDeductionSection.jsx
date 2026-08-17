import React from "react";
import { IndianRupee } from "lucide-react";

const FreightDeductionSection = ({ order }) => {
    // B2B orders never populate priceBreakup — they store their charge
    // breakdown in rateBreakup instead (set at booking time in the B2B
    // Shiprocket/Delhivery controllers), with a different shape entirely.
    const isB2B = order.orderType === "B2B";
    const breakup = isB2B ? order.rateBreakup : order.priceBreakup;
    const hasBreakup = breakup && Object.keys(breakup).length > 0;

    if (order.status === "new" || !hasBreakup) {
        return null;
    }

    const isCOD = order.paymentDetails?.method === "COD";

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2 border-b pb-2">
                <p className="p-2 bg-blue-100 hidden sm:block rounded-full">
                    <IndianRupee className="w-4 h-4 text-[#0192ED]" />
                </p>
                <h2 className="text-[12px] sm:text-[14px] font-[600] text-gray-700">
                    Freight Deduction
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left sm:text-[12px] text-[10px]">
                    <thead>
                        <tr className="text-gray-700 font-[600] border-b">
                            {isB2B ? (
                                <>
                                    <th className="py-2 px-3 whitespace-nowrap">Chargeable Weight</th>
                                    <th className="py-2 px-3">Rate/Kg</th>
                                    <th className="py-2 px-3">Freight</th>
                                    <th className="py-2 px-3">Docket</th>
                                    <th className="py-2 px-3">Pickup</th>
                                    <th className="py-2 px-3">Handling</th>
                                    <th className="py-2 px-3">Appointment</th>
                                    {isCOD && <th className="py-2 px-3">COD</th>}
                                    <th className="py-2 px-3">ROV</th>
                                    <th className="py-2 px-3">FSC</th>
                                    <th className="py-2 px-3">ODA</th>
                                    <th className="py-2 px-3">Green Tax</th>
                                    <th className="py-2 px-3">GST</th>
                                    <th className="py-2 px-3">Total</th>
                                </>
                            ) : (
                                <>
                                    <th className="py-2 px-3">Type</th>
                                    <th className="py-2 px-3 whitespace-nowrap">Applicable Weight</th>
                                    {isCOD && <th className="py-2 px-3">COD</th>}
                                    <th className="py-2 px-3">Freight</th>
                                    <th className="py-2 px-3">GST</th>
                                    <th className="py-2 px-3">Total</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="font-[600] text-gray-500">
                            {isB2B ? (
                                <>
                                    <td className="py-2 px-3">{breakup.billable_weight || breakup.actual_chargeable_weight || 0} Kg</td>
                                    <td className="py-2 px-3">₹{breakup.rate || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.freight || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.docket_charges || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.pickup_charge || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.handling_charge || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.appointment_charge || 0}</td>
                                    {isCOD && <td className="py-2 px-3">₹{breakup.cod_charges || 0}</td>}
                                    <td className="py-2 px-3">₹{breakup.rov || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.fsc || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.oda || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.green_tax || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.gst || 0}</td>
                                    <td className="py-2 px-3 text-[#0192ED]">₹{breakup.grand_total || 0}</td>
                                </>
                            ) : (
                                <>
                                    <td className="py-2 px-3">{order.orderType || "B2C"}</td>
                                    <td className="py-2 px-3">
                                        {order.packageDetails?.applicableWeight || order.B2BPackageDetails?.applicableWeight || 0} Kg
                                    </td>
                                    {isCOD && <td className="py-2 px-3">₹{breakup.cod || 0}</td>}
                                    <td className="py-2 px-3">₹{breakup.freight || 0}</td>
                                    <td className="py-2 px-3">₹{breakup.gst || 0}</td>
                                    <td className="py-2 px-3 text-[#0192ED]">₹{breakup.total || 0}</td>
                                </>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FreightDeductionSection;
