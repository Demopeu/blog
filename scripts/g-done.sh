#!/bin/bash
# GitHub Issue & Branch Auto-Finish

echo "🚀 PR 생성 및 병합 프로세스를 시작합니다..."
echo "----------------------------------------"

current_branch=$(git rev-parse --abbrev-ref HEAD)
issue_num=$(echo "$current_branch" | cut -d'/' -f2 | cut -d'-' -f1)

if [[ ! "$issue_num" =~ ^[0-9]+$ ]]; then
  echo "❌ 현재 브랜치($current_branch)에서 이슈 번호를 찾을 수 없습니다."
  exit 1
fi

echo "📝 1/3: PR을 생성하고 이슈(#$issue_num)와 연결합니다..."
issue_title=$(gh issue view "$issue_num" --json title --jq '.title')

gh pr create --base develop --title "$issue_title" --body "Closes #$issue_num" --fill

if [ $? -ne 0 ]; then
  echo "❌ PR 생성 실패! 혹시 푸시(git push)를 잊으셨나요?"
  exit 1
fi

echo "🔀 2/3: PR을 develop에 병합하고 원격 브랜치를 삭제합니다..."
gh pr merge --merge --delete-branch

echo "🧹 3/3: 로컬 브랜치를 삭제하고 develop으로 복귀합니다..."
git checkout develop
git pull origin develop
git branch -D "$current_branch"

echo "----------------------------------------"
echo "🎉 정리 완료! 이슈 #$issue_num가 자동으로 닫혔습니다. 🔒"