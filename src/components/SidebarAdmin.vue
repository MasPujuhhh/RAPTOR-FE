<template>
  <div class="sidebar bg-dark text-white">
    <h2 class="sidebar-title">EPILOG</h2>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link :to="{ path: '/admin' }" class="nav-link" :class="{ active: isActive('/admin') }">
          <i class="bi bi-speedometer2" style="margin-right: 0.5rem;"></i> Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/admin/tugas' }" class="nav-link" :class="{ active: isActive('/admin/tugas') }">
          <i class="bi bi-journals" style="margin-right: 0.5rem;"></i> Tugas
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/admin/absensi' }" class="nav-link" :class="{ active: isActive('/admin/absensi') }">
          <i class="bi bi-person-lines-fill" style="margin-right: 0.5rem;"></i> Absensi
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/admin/pengumuman' }" class="nav-link" :class="{ active: isActive('/admin/pengumuman') }">
          <i class="bi bi-bell" style="margin-right: 0.5rem;"></i> Pengumuman
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/admin/daily-report' }" class="nav-link" :class="{ active: isActive('/admin/daily-report') }">
          <i class="bi bi-file-earmark-text" style="margin-right: 0.5rem;"></i> Daily Report
        </router-link>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link d-flex justify-content-between align-items-center" @click.prevent="toggleDropdown('master')" :class="{ active: isMasterActive() }">
          <span><i class="bi bi-people"></i> Master</span>
          <i :class="dropdown.master ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
        </a>
        <ul v-show="dropdown.master" class="nav flex-column ms-3">
          <li class="nav-item">
            <router-link :to="{ path: '/admin/master-user' }" class="nav-link" :class="{ active: isActive('/admin/master-user') }">
              <i class="bi bi-people" style="margin-right: 0.5rem;"></i> User
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/admin/master-role' }" class="nav-link" :class="{ active: isActive('/admin/master-role') }">
              <i class="bi bi-person-gear" style="margin-right: 0.5rem;"></i> Role
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/admin/master-category' }" class="nav-link" :class="{ active: isActive('/admin/master-category') }">
              <i class="bi bi-folder" style="margin-right: 0.5rem;"></i> Kategori
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/admin/master-label' }" class="nav-link" :class="{ active: isActive('/admin/master-label') }">
              <i class="bi bi-bookmarks" style="margin-right: 0.5rem;"></i> Label
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/admin/master-tags' }" class="nav-link" :class="{ active: isActive('/admin/master-tags') }">
              <i class="bi bi-tags" style="margin-right: 0.5rem;"></i> Tags
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const dropdown = ref({
  master: false
});

const toggleDropdown = (menu) => {
  dropdown.value[menu] = !dropdown.value[menu];
};

const isActive = (path) => route.path === path;

const masterRoutes = [
  '/admin/master-user',
  '/admin/master-category',
  '/admin/master-label',
  '/admin/master-tags',
  '/admin/master-role',
];

const isMasterActive = () => masterRoutes.includes(route.path);

onMounted(() => {
  if (isMasterActive()) {
    dropdown.value.master = true;
  }
});
</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 5px;
  transition: background-color 0.2s;
  color: white;
}

.nav-link:hover {
  background-color: #495057;
}

.nav-link.active {
  background-color: #495057 !important;
  color: #ffffff;
}

.ms-3 {
  margin-left: 1rem;
}
</style>
