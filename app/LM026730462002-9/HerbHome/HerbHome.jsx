import React, { useState } from 'react';

// ข้อ 1: สร้าง Object Array เพื่อจัดเก็บข้อมูลสมุนไพรเริ่มต้น 2 Objects
const initialHerbs = [
  {
    id: 1,
    name: "มะกรูด",
    detail: "บำรุงหนังศีรษะ",
    type: "B", // B = ใช้ภายนอก
    supplier: "สมชาย ใจดี"
  },
  {
    id: 2,
    name: "ฟ้าทะลายโจร",
    detail: "แก้ไข้ แก้เจ็บคอ",
    type: "C", // C = ใช้ทั้งภายในและภายนอก
    supplier: "มงคล สุขใจ"
  }
];

export default function HerbHome() {
  // ข้อ 3: การประกาศและใช้งาน Hooks (useState)
  const [herbs, setHerbs] = useState(initialHerbs);

  // สเตต สำหรับจัดการข้อมูลในฟอร์ม (ข้อ 4.2: กำหนดค่าเริ่มต้นประเภทสมุนไพรเป็น "C")
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    supplier: '',
    type: 'C'
  });

  // แมปโค้ดประเภทเป็นข้อความแสดงผล
  const getTypeName = (typeCode) => {
    switch (typeCode) {
      case 'A': return 'ใช้ภายใน';
      case 'B': return 'ใช้ภายนอก';
      case 'C': return 'ใช้ภายในและภายนอก';
      default: return typeCode;
    }
  };

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ข้อ 5: บันทึกข้อมูลลงใน Object Array ด้วย Spread Operator (...)
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newHerb = {
      id: Date.now(), // เจน ID แบบง่าย
      ...formData
    };

    setHerbs([...herbs, newHerb]);

    // รีเซ็ตฟอร์มกลับเป็นค่าเริ่มต้น
    handleClear();
  };

  // เคลียร์ฟอร์ม
  const handleClear = () => {
    setFormData({
      name: '',
      detail: '',
      supplier: '',
      type: 'C'
    });
  };

  // ข้อ 7: Arrow Function สำหรับตรวจสอบเงื่อนไขข้อมูลประเภทสมุนไพร
  const checkTypeBadge = (type) => {
    return getTypeName(type);
  };

  // ข้อ 8: Arrow Function ตรวจสอบการลบข้อมูลโดยใช้ filter()
  const handleDelete = (id) => {
    const updatedHerbs = herbs.filter(herb => herb.id !== id);
    setHerbs(updatedHerbs);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>วิชา การเขียนโปรแกรมเว็บ รหัสวิชา 04-06-215</h2>
      
      {/* ข้อ 4: ฟอร์มบันทึกข้อมูลสมุนไพร (HerbForm) */}
      <div style={{ marginBottom: '30px' }}>
        <h3>เพิ่มข้อมูลสมุนไพร</h3>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'inline-block', width: '120px' }}>ชื่อสมุนไพร:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter herb.."
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'inline-block', width: '120px' }}>รายละเอียด:</label>
            <textarea
              name="detail"
              placeholder="Enter detail.."
              value={formData.detail}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'inline-block', width: '120px' }}>ผู้ผลิต:</label>
            <input
              type="text"
              name="supplier"
              placeholder="Enter supplier.."
              value={formData.supplier}
              onChange={handleChange}
            />
          </div>

          {/* ข้อ 4.1 & 4.2: Radio group + ค่าเริ่มต้นเป็นประเภท "ใช้ภายนอกและภายใน" */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'inline-block', width: '120px' }}>ประเภทสมุนไพร:</label>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="type"
                value="B"
                checked={formData.type === 'B'}
                onChange={handleChange}
              />
              ใช้ภายนอก
            </label>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="type"
                value="A"
                checked={formData.type === 'A'}
                onChange={handleChange}
              />
              ใช้ภายใน
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="C"
                checked={formData.type === 'C'}
                onChange={handleChange}
              />
              ใช้ภายนอกและภายใน
            </label>
          </div>

          <div style={{ paddingLeft: '120px' }}>
            <button type="submit" style={{ marginRight: '10px', padding: '5px 15px' }}>บันทึก</button>
            <button type="button" onClick={handleClear} style={{ padding: '5px 15px' }}>เคลียร์</button>
          </div>
        </form>
      </div>

      <hr />

      {/* ข้อ 6: แสดงผลข้อมูลโดยใช้ map() และ Object Destructuring */}
      <div>
        <h3>รายการสมุนไพรในระบบ</h3>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlignment: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>ชื่อสมุนไพร</th>
              <th>ประเภท</th>
              <th>ผู้ผลิต</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {herbs.map((herb) => {
              // ข้อ 6: ใช้ Object Destructuring
              const { id, name, type, supplier } = herb;

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{checkTypeBadge(type)}</td>
                  <td>{supplier}</td>
                  <td>
                    {/* ข้อ 8: ปุ่มกดลบ "[x] ลบ" ทำงานผ่าน Arrow Function และ filter */}
                    <button onClick={() => handleDelete(id)}>ลบ</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ข้อ 2: ส่วนของ Footer แสดงข้อมูลผู้สอบ */}
      <footer style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>© 2026 By ชื่อ-สกุล: นายศิริพงษ์ เทียนมณี รหัสนักศึกษา: 026730462002-9</p>
      </footer>
    </div>
  );
}