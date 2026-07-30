// wrapper ครอบ input ในฟอร์ม: ใส่ label ด้านบนและข้อความ error สีแดงด้านล่างให้อัตโนมัติ
// children คือ input/select ตัวจริงที่ส่งเข้ามาจากภายนอก
function FormField({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-left group">
      <span className="text-sm font-semibold text-gray-700 dark:text-[var(--text-h)] transition-colors">{label}</span>
      <div className="relative">
        {children}
      </div>
      {error && (
        <span className="text-sm font-medium text-red-500 animate-in slide-in-from-top-1 fade-in-0 duration-200">
          {error}
        </span>
      )}
    </label>
  )
}

export default FormField
