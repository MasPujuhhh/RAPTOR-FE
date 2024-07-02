import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/user/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // USER
    {
      path: "/",
      name: "home-user",
      component: () => import("../views/user/HomeView.vue"),
    },
    {
      path: "/logbook",
      name: "logbok",
      component: () => import("../views/user/UserLogbook.vue"),
    },
    {
      path: "/logbook/:id",
      name: "logbook-id",
      component: () => import("../views/user/UserLogbookDetail.vue"),
    },
    {
      path: "/logbook/edit/:id",
      name: "logbook-edit-date",
      component: () => import("../views/user/UserLogbookEdit.vue"),
    },
    {
      path: "/todo",
      name: "todo",
      component: () => import("../views/user/UserTodo.vue"),
    },
    {
      path: "/sertifikat",
      name: "sertifikat",
      component: () => import("../views/user/UserCertificate.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/user/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/user/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/user/Register.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/user/ProfileView.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/user/HistoryView.vue"),
    },
    {
      path: "/rating",
      name: "rating",
      component: () => import("../views/user/RatingView.vue"),
    },
    {
      path: "/detail-product",
      name: "detailProduct",
      component: () => import("../views/user/DetailProduct.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/user/ChatUser.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/user/OrderView.vue"),
    },
    {
      path: "/list-product",
      name: "listProduct",
      component: () => import("../views/user/ListAllProduct.vue"),
    },
    {
      path: "/kategori/:nama",
      name: "kategori",
      component: () => import("../views/user/KategoriView.vue"),
    },

    // ADMIN
    {
      path: "/admin",
      name: "dashboard-admin",
      component: () => import("../views/admin/Dashboard.vue"),
    },
    // {
    //   path: "/admin/logbook",
    //   name: "admin-logbook",
    //   component: () =>
    //     import("../views/admin/logbook/MainLogbook.vue"),
    // },
    // {
    //   path: "/admin/logbook/:id",
    //   name: "admin-logbook-id",
    //   component: () =>
    //     import("../views/admin/logbook/LogbookDetail.vue"),
    // },
    // {
    //   path: "/admin/activity",
    //   name: "admin-activity",
    //   component: () =>
    //     import("../views/admin/activity/MainActivity.vue"),
    // },
    // {
    //   path: "/admin/attendance",
    //   name: "admin-attendance",
    //   component: () =>
    //     import("../views/admin/attendance/MainAttendance.vue"),
    // },
    // {
    //   path: "/admin/certificate",
    //   name: "admin-certificate",
    //   component: () =>
    //     import("../views/admin/certificate/MainCertificate.vue"),
    // },
    // {
    //   path: "/admin/certificate/add",
    //   name: "admin-certificate-add",
    //   component: () =>
    //     import("../views/admin/certificate/AddCertificate.vue"),
    // },
    // {
    //   path: "/admin/certificate/edit/:id",
    //   name: "admin-certificate-edit",
    //   component: () =>
    //     import("../views/admin/certificate/EditCertificate.vue"),
    // },
    // {
    //   path: "/admin/task",
    //   name: "admin-task",
    //   component: () =>
    //     import("../views/admin/task/MainTask.vue"),
    // },
    // {
    //   path: "/admin/task/add",
    //   name: "admin-task-add",
    //   component: () =>
    //     import("../views/admin/task/AddTask.vue"),
    // },
    {
      path: "/admin/master-user",
      name: "admin-user",
      component: () => import("../views/admin/masterUser/MasterUser.vue"),
    },
    {
      path: "/admin/master-tags",
      name: "admin-tags",
      component: () => import("../views/admin/masterTags/MasterTags.vue"),
    },
    {
      path: "/admin/master-role",
      name: "admin-role",
      component: () => import("../views/admin/masterRole/MasterRole.vue"),
    },
    {
      path: "/admin/master-category",
      name: "admin-category",
      component: () =>
        import("../views/admin/masterCategory/MasterCategory.vue"),
    },
    {
      path: "/admin/master-label",
      name: "admin-label",
      component: () => import("../views/admin/masterLabel/MasterLabel.vue"),
    },
    {
      path: "/admin/tugas",
      name: "admin-tugas",
      component: () => import("../views/admin/tugas/Tugas.vue"),
    },
    {
      path: "/admin/tugas/add",
      name: "admin-tugas-add",
      component: () => import("../views/admin/tugas/AddTugas.vue"),
    },
    {
      path: "/admin/tugas/detail/:id",
      name: "admin-tugas-detail",
      component: () => import("../views/admin/tugas/DetailTugas.vue"),
    },
    {
      path: "/admin/tugas/edit/:id",
      name: "admin-tugas-edit",
      component: () => import("../views/admin/tugas/EditTugas.vue"),
    },
    {
      path: "/admin/absensi",
      name: "admin-absensi",
      component: () => import("../views/admin/tugas/Tugas.vue"),
    },
    {
      path: "/admin/pengumuman",
      name: "admin-pengumuman",
      component: () => import("../views/admin/pengumuman/Pengumuman.vue"),
    },
    {
      path: "/admin/daily-report",
      name: "admin-daily-report",
      component: () => import("../views/admin/tugas/Tugas.vue"),
    },
    {
      path: "/tes",
      name: "tes",
      component: () => import("../views/admin/Tes.vue"),
    },
    {
      path: "/tess",
      name: "tes2",
      component: () => import("../views/admin/Tes2.vue"),
    },
    {
      path: "/user",
      name: "userbjir",
      component: () => import("../views/user/user.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const isAuthUser = JSON.parse(localStorage.getItem("authUser"));
//   const isAuthAdmin = JSON.parse(localStorage.getItem("authAdmin"));
//   // console.log(isAuthAdmin)

//   // console.log(to.name === "login" && isAuthAdmin);
//   // console.log("from", from);
//   // if (to.path === "http://localhost:8001/auth/google") next();
//   // if (to.name === "home-user") next();
//   if (to.name === "register") next();
//   // if (to.name === "listProduct") next();
//   // if (to.name === "kategori") next();
//   // if (to.name === "login-google") next();
//   if (isAuthAdmin) next();

//   if (to.name !== "login" && !isAuthUser) next({ name: "login" });
//   if (to.name === "login" && isAuthUser) next({ name: "home-user" });
//   if (to.name === "login" && isAuthAdmin) next({ name: "dashboard-admin" });
//   next();
// });

export default router;
