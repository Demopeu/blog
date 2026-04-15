#!/bin/bash
# GitHub Issue & Branch Auto-Finish

echo "
██████╗ ███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██╔████╔██║██║   ██║██████╔╝█████╗  ██║   ██║
██║  ██║██╔══╝  ██║╚██╔╝██║██║   ██║██╔═══╝ ██╔══╝  ██║   ██║
██████╔╝███████╗██║ ╚═╝ ██║╚██████╔╝██║     ███████╗╚██████╔╝
╚═════╝ ╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚══════╝ ╚═════╝ 

� PR 생성 및 병합 프로세스를 시작합니다...
"
echo "----------------------------------------"

# Y/N 확인용 공통 함수 (y는 진행, n은 스킵)
confirm_step() {
  while true; do
    read -p "$1 (y/n): " yn
    case $yn in
      [Yy]* ) return 0;;
      [Nn]* ) return 1;;
      * ) echo "⚠️ y 또는 n만 입력해주세요.";;
    esac
  done
}

# 1. 현재 브랜치 정보 추출
current_branch=$(git rev-parse --abbrev-ref HEAD)
issue_num=$(echo "$current_branch" | grep -oE '[0-9]+' | head -n 1)

if [[ -z "$issue_num" ]]; then
  echo "❌ 현재 브랜치($current_branch)에서 이슈 번호를 찾을 수 없습니다."
  exit 1
fi

# 2. PR 생성
echo "📝 1/3: PR을 생성하고 이슈(#$issue_num)와 연결합니다..."
issue_title=$(gh issue view "$issue_num" --json title --jq '.title')

gh pr create --base develop --title "$issue_title" --body "Closes #$issue_num"

if [ $? -ne 0 ]; then
  echo "❌ PR 생성 실패! 푸시(git push) 여부를 확인하세요."
  exit 1
fi

echo "----------------------------------------"

# 3. PR 병합 (선택)
if confirm_step "🔀 PR을 develop 브랜치에 병합할까요?"; then
  echo "⏳ 커스텀 메시지로 병합을 진행합니다..."
  # --subject 옵션으로 merge commit의 제목을 커스텀합니다.
  gh pr merge --merge --subject "merge: $current_branch"
  
  echo "----------------------------------------"
  # 3-1. 원격 브랜치 삭제 (선택)
  if confirm_step "🗑️ 깃허브 서버의 원격 브랜치(origin/$current_branch)를 삭제할까요?"; then
    echo "⏳ 원격 브랜치 삭제 중..."
    git push origin --delete "$current_branch" 2>/dev/null || echo "⚠️ 이미 삭제되었거나 찾을 수 없습니다."
  else
    echo "✅ 원격 브랜치를 보존합니다."
  fi
else
  echo "⏸️ PR만 생성하고 병합은 건너뜁니다. (나중에 웹에서 직접 합칠 수 있습니다)"
fi

echo "----------------------------------------"

# 4. 로컬 정리 및 이슈 강제 종료 (선택)
if confirm_step "🧹 이슈(#$issue_num)를 닫고 내 컴퓨터의 로컬 브랜치를 정리할까요?"; then
  echo "⏳ 정리 중..."
  gh issue close "$issue_num"
  
  git checkout develop
  git pull origin develop
  git branch -D "$current_branch" 2>/dev/null
  
  echo "🎉 정리 완료! 이슈 #$issue_num 가 닫혔습니다. 🔒"
else
  echo "✅ 로컬 환경과 이슈를 현재 상태 그대로 유지합니다."
  echo "🎉 작업 완료!"
fi