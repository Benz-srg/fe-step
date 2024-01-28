"use client";
import React, { useEffect, useState, useRef } from "react";
import MainLayout from "./main_layout";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../Loader";
import { useStore } from "@nanostores/react";
import { authStore } from "@/app/store/auth";
import axiosInstance from "@/app/utils/axios";
import { setUser } from "@/app/store/user";
import adminService from "@/services/admin.service";
import userService from "@/services/user.service";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const auth = useStore(authStore);
  const router = useRouter();
  const didRender = useRef(false);

  useEffect(() => {
    setLoading(true);
    const getProfile = async () => {
      try {
        axiosInstance.defaults.headers.common.Authorization =
          `Bearer ` + auth?.user?.token;

        let userProfile;
        if (auth?.user?.user_type_id !== 1) {
          const { data } = await adminService.profile();
          userProfile = data;
        } else {
          const { data } = await userService.profile();
          userProfile = data;
        }
        setUser(userProfile);
      } catch (error) {}
    };
    if (loading && !auth?.isLoggedIn) router.push("/login");
    if (auth?.isLoggedIn && !didRender.current) getProfile();
    didRender.current = true;
  }, [loading]);

  useEffect(() => {}, [loading]);

  if (!loading) return <Loader />;

  return loading && auth.isLoggedIn && <MainLayout>{children}</MainLayout>;
};

export default Layout;
