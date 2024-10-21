import { useState, useEffect } from 'react';
import { Drawer, Button, Typography } from 'antd';
import { StarOutlined, PlusCircleOutlined, MinusCircleOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AddIcon = () => (
  <svg
    className="w-7 h-7 opacity-65"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 12H18" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18V6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);



const ShortcutDrawer = ({visibleMenus, setOpen, open}) => {

  const [selectedShortcuts, setSelectedShortcuts] = useState([]);

  const viewableMenus = visibleMenus.filter((item) => item.pm_view && item.parent_path !== null);

  useEffect(() => {
    const storedShortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
    setSelectedShortcuts(storedShortcuts);
  }, []);

  const saveShortcuts = (updatedShortcuts) => {
    localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts));
    setSelectedShortcuts(updatedShortcuts);
  };

  const addShortcut = (menu) => {
    const updated = [...selectedShortcuts, menu];
    saveShortcuts(updated);
  };

  const removeShortcut = (key) => {
    const updated = selectedShortcuts.filter((item) => item.key_name !== key);
    saveShortcuts(updated);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="border-none bg-none shadow-none">
        <AddIcon />
      </button>

      <Drawer
        placement="bottom"
        onClose={() => setOpen(false)}
        visible={open}
        height="97%"
        headerStyle={{ display: 'none' }}
        closable={true}
        bodyStyle={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
      >
        {/* Nút đóng Drawer */}
        <div className="flex items-end justify-end">
          <Button
            className="bg-slate-100 border-none rounded-full"
            onClick={() => setOpen(false)}
            icon={<CloseOutlined />}
          />
        </div>

        {/* Nhóm Phím Tắt Đã Chọn */}
        <div className="mb-6 mt-5">
          <Text className="opacity-60 text-sm mb-2 mt-5">PHÍM TẮT</Text>
          <div className="space-y-2 mt-2">
            {selectedShortcuts.map((shortcut) => (
              <div
                key={shortcut.key_name}
                className="flex items-center gap-2 p-2 border-b-[0.5px] rounded-lg  bg-slate-50"
              >
                <Button
                  type="text"
                  icon={<MinusCircleOutlined className="text-red-500" />}
                  onClick={() => removeShortcut(shortcut.key_name)}
                />
                <div>
                  <StarOutlined className="mr-2 text-yellow-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-65">{shortcut.key_name}</span>
                  <span className="text-sm">{shortcut.menu_name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nhóm Gợi Ý */}
        <div>
          <Text className="opacity-60 text-sm mb-2 mt-5">SUGGESTED SHORTCUTS</Text>
          <div className="space-y-2 mt-2">
            {viewableMenus
              .filter((menu) => !selectedShortcuts.some((item) => item.key_name === menu.key_name))
              .map((menu) => (
                <div
                  key={menu.key_name}
                  className="flex items-center gap-2 p-2 border-b-[0.5px] rounded-lg  bg-slate-50"
                >
                  <Button
                    type="text"
                    icon={<PlusCircleOutlined className="text-green-500" />}
                    onClick={() => addShortcut(menu)}
                  />
                  <div>
                    <StarOutlined className="mr-2 text-gray-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs opacity-65">{menu.key_name}</span>
                    <span className="text-sm">{menu.menu_name}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ShortcutDrawer;
