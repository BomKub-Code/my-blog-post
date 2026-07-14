import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// รวม className หลายก้อนเข้าด้วยกัน (clsx) แล้วให้ tailwind-merge ตัด class
// tailwind ที่ขัดแย้งกันออก (เช่น px-2 กับ px-4 พร้อมกัน จะเหลือตัวหลังสุด)
// ใช้ทุกที่ที่ component รับ className จากภายนอกมา merge กับ class เดิม
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// แปลงวันที่แบบ ISO string จาก API ให้เป็นรูปแบบอ่านง่าย เช่น "14 July 2026"
// ล็อก timeZone เป็น UTC กันไม่ให้วันที่เพี้ยนตาม timezone ของเครื่องผู้ใช้
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// class มาตรฐานของ input ในฟอร์ม (สมัคร/เข้าสู่ระบบ) เปลี่ยนสีขอบเป็นแดง
// เมื่อ hasError = true เพื่อบอก validation error ให้ผู้ใช้เห็นทันที
export function formInputClass(hasError) {
  return cn(
    'h-11 w-full rounded-lg border bg-(--bg) px-3.5 text-sm text-(--text-h) placeholder:text-(--text) focus:outline-none focus:border-(--text-h)',
    hasError ? 'border-red-400' : 'border-(--border)'
  )
}
