#!/bin/bash
# GitHub Issue & Branch Auto-Finish

echo "🚀 PR 생성 및 병합 프로세스를 시작합니다..."
echo "----------------------------------------"

# 1. 현재 브랜치 정보 추출
current_branch=$(git rev-parse --abbrev-ref HEAD)
# 이슈 번호만 정확히 추출 (숫자만 뽑아내기)
issue_num=$(echo "$current_branch" | grep -oE '[0-9]+' | head -n 1)

if [[ -z "$issue_num" ]]; then
  echo "❌ 현재 브랜치($current_branch)에서 이슈 번호를 찾을 수 없습니다."
  exit 1
fi

# 2. PR 생성
echo "📝 1/3: PR을 생성하고 이슈(#$issue_num)와 연결합니다..."
issue_title=$(gh issue view "$issue_num" --json title --jq '.title')

# --fill 대신 명시적으로 body를 주입하여 꼬임을 방지합니다.
gh pr create --base develop --title "$issue_title" --body "Closes #$issue_num"

if [ $? -ne 0 ]; then
  echo "❌ PR 생성 실패! 푸시 여부를 확인하세요."
  exit 1
fi

# 3. PR 병합 및 원격 브랜치 삭제
echo "🔀 2/3: PR을 develop에 병합합니다..."
gh pr merge --merge --delete-branch

# 4. 로컬 정리 및 이슈 강제 종료 (핵심 ⭐️)
echo "🧹 3/3: 이슈(#$issue_num)를 직접 닫고 로컬을 정리합니다..."
# GitHub의 기본 브랜치 규칙을 무시하고 강제로 이슈를 닫습니다.
gh issue close "$issue_num"

# develop으로 이동하여 최신화
git checkout develop
git pull origin develop

# 이미 삭제되었을 수 있으므로 에러 메시지를 숨기고 삭제 시도
git branch -D "$current_branch" 2>/dev/null

echo "----------------------------------------"
echo "🎉 정리 완료! 이슈 #$issue_num 가 닫혔습니다. 🔒"