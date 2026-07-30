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
export function formInputClass(hasError, hasIcon = false, hasRightElement = false) {
  return cn(
    'h-12 w-full rounded-xl border bg-white dark:bg-[var(--bg)] px-4 text-sm text-gray-900 dark:text-[var(--text-h)] shadow-sm transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-[var(--text)] focus:outline-none focus:ring-4',
    hasIcon && 'pl-11',
    hasRightElement && 'pr-11',
    hasError 
      ? 'border-red-300 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30 dark:bg-red-900/10' 
      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-black dark:focus:border-white focus:ring-black/10 dark:focus:ring-white/10'
  )
}
