"use client";

import { Switch } from "@/components/ui/switch";
import { toggleCouponStatus } from "@/app/actions/coupon-actions";
import { useState } from "react";

export default function CouponStatusToggle({ id, isActive }: { id: string, isActive: boolean }) {
    const [active, setActive] = useState(isActive);

    const handleToggle = async (val: boolean) => {
        setActive(val);
        await toggleCouponStatus(id, val);
    };

    return (
        <Switch checked={active} onCheckedChange={handleToggle} />
    );
}
