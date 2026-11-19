import { revalidatePath } from "next/cache";
import { getDb } from "../lib/db";

export const dynamic = "force-dynamic";

async function addMessage(formData: FormData) {
  "use server";

  const body = formData.get("body");
  if (typeof body !== "string") return;
  const message = body.trim();
  if (!message || message.length > 280) return;

  await getDb().message.create({ data: { body: message } });
  revalidatePath("/");
}

export default async function Home() {
  let messages: { id: number; body: string }[] = [];
  let available = true;

  try {
    messages = await getDb().message.findMany({
      orderBy: { id: "desc" },
      take: 20,
      select: { id: true, body: true },
    });
  } catch {
    available = false;
  }

  return (
    <main>
      <p className="eyebrow">NEXT.JS / PRISMA / POSTGRESQL</p>
      <h1>我的留言板</h1>
      <p>写一条留言，刷新页面看看它是否还在。请不要填写个人信息。</p>
      {available ? (
        <>
          <form action={addMessage}>
            <label htmlFor="body">你的留言</label>
            <textarea id="body" name="body" rows={3} required maxLength={280} />
            <button type="submit">发布留言</button>
          </form>
          <section aria-labelledby="recent">
            <h2 id="recent">最近留言</h2>
            {messages.length ? (
              <ul>{messages.map((message) => <li key={message.id}>{message.body}</li>)}</ul>
            ) : <p>还没有留言。来发第一条吧！</p>}
          </section>
        </>
      ) : <p role="status">暂时无法读取留言，请检查数据库连接和迁移配置。</p>}
    </main>
  );
}
