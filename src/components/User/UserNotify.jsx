import React from "react";
import "./UserNotify.css";
import voucherArr from "../../assets/data/voucherArr";
const UserNotify = () => {
  return (
    <>
      <div className="notify">
        <div className="notify-content">
          <div className="notify-seen">
            <button class="notify-seen-btn">Đánh dấu Đã đọc tất cả</button>
          </div>
          <div className="notify-info">
            {voucherArr?.map((item, idx) => (
              <>
                <div className="notify-img" key={idx}>
                  <div className="notify-img-1">
                    <div className="notify-img-2">
                      <div
                        className="notify-bg"
                        style={{
                          backgroundImage: `url(${item.bg})`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="notify-text">
                    <h1>{item.title}</h1>
                    <div className="notify-text-1">{item.name}</div>
                    <div className="notify-text-2">
                      <p>{item.time}</p>
                    </div>
                  </div>
                  <div className="notify-btn">
                    <button>Xem chi tiết</button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotify;
