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
      path: "/daily-report",
      name: "logbok",
      component: () => import("../views/user/UserDaily.vue"),
    },
    {
      path: "/daily-report/:id",
      name: "daily-report-id",
      component: () => import("../views/user/UserDaily.vue"),
    },
    {
      path: "/logbook/edit/:id",
      name: "logbook-edit-date",
      component: () => import("../views/user/UserDaily.vue"),
    },
    {
      path: "/tugas",
      name: "tugas",
      component: () => import("../views/user/UserTugas.vue"),
    },
    {
      path: "/tugas/detail/:id",
      name: "tugas-detail",
      component: () => import("../views/user/UserTugasDetail.vue"),
    },
    {
      path: "/absensi",
      name: "absensi",
      component: () => import("../views/user/UserAbsensi.vue"),
    },
    {
      path: "/pengumuman",
      name: "pengumuman",
      component: () => import("../views/user/UserPengumuman.vue"),
    },
    {
      path: "/pengumuman/:id",
      name: "pengumuman-detail",
      component: () => import("../views/user/UserPengumumanDetail.vue"),
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
      name: "admin",
      component: () => import("../views/admin/Dashboard.vue"),
    },
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
      component: () => import("../views/admin/absensi/Absensi.vue"),
    },
    {
      path: "/admin/pengumuman",
      name: "admin-pengumuman",
      component: () => import("../views/admin/pengumuman/Pengumuman.vue"),
    },
    {
      path: "/admin/daily-report",
      name: "admin-daily-report",
      component: () => import("../views/admin/daily_report/DailyReport.vue"),
    },
    {
      path: "/absen/:id",
      name: "absen-detail",
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

router.beforeEach((to, from, next) => {
  const is_admin = JSON.parse(localStorage.getItem("authAdmin"));
  const token = localStorage.getItem("token") || null

  // gapunya token
  if (to.name != 'login' && !token) {
    next({name : "login"})
  }

  // user gapunya akses ke admin
  if ((to.name=='admin'||to.name=='admin-user'||to.name=='admin-tags'||to.name=='admin-role'||to.name=='admin-category'||
       to.name=='admin-label'||to.name=='admin-tugas'||to.name=='admin-tugas-add'||to.name=='admin-tugas-detail'||to.name=='admin-tugas-edit'||
       to.name=='admin-absensi'||to.name=='admin-pengumuman'||to.name=='admin-daily-report') && !is_admin) {
    next({name : "login"})
  }

  // udah login tapi ke login admin
  if (to.name == 'login' && token && !is_admin) {
    next({name : "home-user"})
  }

  // udah login tapi ke login user
  if (to.name == 'login' && token && is_admin) {
    next({name : "admin"})
  }
  
  next();
});

export default router;
