import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { users, tokenTransactions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (!user) return NextResponse.json(null);

    // Map DB fields to Frontend ProfileData interface
    const profileData = {
      ...user,
      fullName: user.name, // Map name to fullName for UI consistency
    };

    console.log("Fetched User Profile (Mapped):", user.id);
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const userId = session.user.id;

    console.log("Saving Profile Data for User:", userId, body);

    const currentUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newProgress = body.progress || 100;
    let tokenIncrement = 0;
    let shouldShowSuccess = false;

    // Reward logic: +100 tokens if reaching 100% for the first time
    if (newProgress === 100 && !currentUser.profileCompletedOnce) {
      tokenIncrement = 100;
      shouldShowSuccess = true;
    }

    const finalTokens = (currentUser.tokens || 0) + tokenIncrement;

    const data = {
      name: body.fullName || currentUser.name,
      email: body.workEmail || currentUser.email,
      phone: body.phone || currentUser.phone,
      firmName: body.firmName,
      role: body.role,
      category: body.professionalCategory || body.category,
      customCategory: body.customCategory,
      baseLocation: body.baseLocation,
      geographies: body.activeGeographies || body.geographies,
      crossBorder: body.isCrossBorder || body.crossBorder,
      corridors: body.focusCorridors || body.corridors,
      sectors: body.primarySectors || body.sectors,
      intent: body.intentType || body.intent,
      prioritySectors: body.prioritySectors,
      coAdvisory: body.coAdvisory,
      collaborationModel: body.collaborationModels || body.collaborationModel,
      additionalInfo: body.intelligenceLayer || body.additionalInfo,
      profileCompletion: newProgress,
      profileCompletedOnce: currentUser.profileCompletedOnce || (newProgress === 100),
      tokens: finalTokens,
    };

    // Update User
    await db.update(users)
      .set(data)
      .where(eq(users.id, userId));

    // Log Transaction if tokens added
    if (tokenIncrement > 0) {
      await db.insert(tokenTransactions).values({
        userId,
        type: 'credit',
        action: 'Profile Completion Reward',
        amount: tokenIncrement,
        balanceAfter: finalTokens,
      });
    }

    console.log("Profile updated successfully for:", userId);

    return NextResponse.json({ 
      success: true, 
      rewarded: tokenIncrement > 0,
      shouldShowSuccess
    });
  } catch (error) {
    console.error('Profile save error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
