<template>
  <section class="index_wrap">
		<div class="inform_wrap">
			<NuxtLink to="	https://jang0ha.github.io">
			https://jang0ha.github.io
					</NuxtLink>
		</div>
		<ul class="project_wrap">
			<li class="project_sort">
				<span>Frontend</span>
				<div class="projects">
					<NuxtLink to="/project/project-hive" class="project_link">
						하이브 플랫폼 웹사이트
					</NuxtLink>
				</div>
			</li>
			<li class="project_sort">
				<span>Scroll Animation</span>
				<div class="projects">
					<NuxtLink to="/project/project-hive" class="project_link">
						더 스타라이트 브랜드사이트
					</NuxtLink>
					<NuxtLink to="/project/project-hive" class="project_link">
						GC 녹십자 채용 사이트
					</NuxtLink>
				</div>
			</li>
			<li class="project_sort">
				<span>웹접근성</span>
				<div class="projects">
					<NuxtLink to="/project/project-hive" class="project_link">
						중앙대 원격미래 교육원
					</NuxtLink>
				</div>
			</li>
			<li class="project_sort">
				<span>ETC.</span>
				<div class="projects">
					<NuxtLink to="/project/project-hive" class="project_link">
						이벤트 페이지
					</NuxtLink>
					<NuxtLink to="/project/project-hive" class="project_link">
						어드민 사이트
					</NuxtLink>
					<NuxtLink to="/project/project-hive" class="project_link">
						More...
					</NuxtLink>
				</div>
			</li>
		</ul>
	</section>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@/assets/scss/abstracts/_variables.scss" as *;
@use "@/assets/scss/abstracts/_functions.scss" as *;
@use "@/assets/scss/components/_button.scss" as *;
.content_block	{
	display:flex;
	flex-direction: column;
}

.index_wrap {
	flex-grow:1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
	padding:2rem 0 4rem 0;
	font-size: 1.2rem;
	}
.inform_wrap {
	margin-bottom: 10rem;
	font-size: 1rem;
	}
.project_wrap {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
	}
.project_sort	{
	flex:1;
	display: flex;
	justify-content: space-between;
	padding: 1rem 0;
	> span {
	flex: none;
	}
	
	 +.project_sort {
	 	border-top: 1px solid var(--border-color);
	}
}
.projects	{
	width: 60%;
	padding-left: 2rem;
	}
.project_link {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width:100%;
	text-align: left;
	color: var(--text-color);
	transition: all 0.2s;
	&:hover	{
		font-weight:700;
	}
	& + .project_link {
		margin-top: 0.6rem;
	}
		@extend %anchor;
        &::after {
            width: 1rem;
            height: 1rem;
            margin-left: 0.6rem;
						background-color: var(--text-color); 
					 	mask-image: url("#{svg-image(anchor-diagonal)}");
					 -webkit-mask-image: url("#{svg-image(anchor-diagonal)}");
        }
}
</style>