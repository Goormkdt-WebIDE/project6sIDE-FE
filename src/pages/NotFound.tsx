import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-10">
      <h1 className="text-5xl mb-3">404 Not Found:</h1>
      <p className="text-xl mb-1  ">해당 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-blue-700" reloadDocument>
        메인으로 돌아가기
      </Link>
    </div>
  );
}
