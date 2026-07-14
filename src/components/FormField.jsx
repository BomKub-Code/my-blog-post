// wrapper ครอบ input ในฟอร์ม: ใส่ label ด้านบนและข้อความ error สีแดงด้านล่างให้อัตโนมัติ
// children คือ input/select ตัวจริงที่ส่งเข้ามาจากภายนอก
function FormField({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-sm font-medium text-(--text-h)">{label}</span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}

export default FormField
