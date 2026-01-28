// 반응형 이미지
export function useResponsiveImage(images) {
  const isMobile = ref(false);

  const check = () => {
    if (process.client) {
      isMobile.value = window.matchMedia('(max-width: 768px)').matches;
    }
  };

  onMounted(() => {
    check();
    window.addEventListener('resize', check);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', check);
  });

  const image = computed(() => {
    if (!images) return null;
    return isMobile.value ? images.mobile || images.pc : images.pc || images.mobile;
  });

  return { image };
}
