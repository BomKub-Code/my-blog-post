import "./App.css";

// ฟังก์ชันสำหรับสร้างข้อความวันที่และเวลาปัจจุบัน รูปแบบ YYYY-MM-DD HH:mm:ss
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() เริ่มนับที่ 0 จึงต้อง +1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Component แสดงส่วนแนะนำ (บทความ) ของ TechUp Thailand
function IntroSection() {
  // เก็บชื่อ class ของแต่ละ element ไว้ใน object เดียว เพื่อให้เรียกใช้และแก้ไขง่าย
  const articleStyles = {
    container: "article",
    title: "article-title",
    body: "article-body",
    link: "article-link",
  };

  return (
    // div ตัวนอกสุด ใช้ articleStyles.container เป็น className
    <div className={articleStyles.container}>
      <h3 className={articleStyles.title}>👨🏽‍💻TechUp Thailand 🚀</h3>
      <p className={articleStyles.body}>
        เตรียมพบกับหลักสูตรปั้นคุณเป็น Software Developer ภายใน 4 เดือน
      </p>
      <a
        className={articleStyles.link}
        href="https://www.techupth.com/"
        target="blank"
      >
        techupth.com
      </a>
      <div className="bootcamp-start-time">
        {/* เรียกฟังก์ชันด้านบนเพื่อแสดงวันเวลาปัจจุบันแบบ real-time ตอน render */}
        วันเวลาเริ่มหลักสูตร คือ {getCurrentDateTime()}{" "}
      </div>
    </div>
  );
}

// Component ฟอร์มสำหรับเข้าสู่ระบบ (ยังไม่มีการจัดการ state หรือ submit logic)
function LoginForm() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Component หลักของแอป รวม IntroSection และ LoginForm เข้าด้วยกัน
function App() {
  return (
    <div className="app">
      <IntroSection />
      <LoginForm />
    </div>
  );
}

export default App;
